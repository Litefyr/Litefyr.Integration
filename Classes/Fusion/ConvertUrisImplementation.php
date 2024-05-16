<?php

namespace Litefyr\Integration\Fusion;

use Neos\Flow\Annotations as Flow;
use Neos\Neos\Domain\Exception;
use Neos\Neos\Fusion\Helper\CachingHelper;
use Neos\Neos\Service\LinkingService;
use Neos\Flow\Log\Utility\LogEnvironment;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Fusion\FusionObjects\AbstractFusionObject;
use Psr\Log\LoggerInterface;
use function preg_replace;
use function preg_replace_callback;
use function str_contains;
use function str_replace;
use function preg_match;
use function preg_match_all;

/**
 * A Fusion Object that converts link references in the format "<type>://<UUID>" to proper URIs
 *
 * Right now node://<UUID> and asset://<UUID> are supported URI schemes.
 *
 * Usage::
 *
 *   someTextProperty.@process.1 = Neos.Neos:ConvertUris
 *
 * The optional property ``forceConversion`` can be used to have the links converted even when not
 * rendering the live workspace. This is used for links that are not inline editable (for
 * example links on images)::
 *
 *   someTextProperty.@process.1 = Neos.Neos:ConvertUris {
 *     forceConversion = true
 *   }
 *
 * The optional property ``externalLinkTarget`` can be modified to disable or change the target attribute of the
 * link tag for links to external targets::
 *
 *   prototype(Neos.Neos:ConvertUris) {
 *     externalLinkTarget = '_blank'
 *     resourceLinkTarget = '_blank'
 *   }
 *
 * The optional property ``absolute`` can be used to convert node uris to absolute links::
 *
 *   someTextProperty.@process.1 = Neos.Neos:ConvertUris {
 *     absolute = true
 *   }
 */
class ConvertUrisImplementation extends AbstractFusionObject
{
    #[Flow\Inject]
    protected LinkingService $linkingService;

    #[Flow\Inject]
    protected CachingHelper $cachingHelper;

    #[Flow\Inject]
    protected LoggerInterface $systemLogger;

    protected string $lightboxAttributes = '';

    /**
     * Convert URIs matching a supported scheme with generated URIs
     *
     * If the workspace of the current node context is not live, no replacement will be done unless forceConversion is
     * set. This is needed to show the editable links with metadata in the content module.
     *
     * @return string
     * @throws Exception
     */
    public function evaluate()
    {
        $text = $this->fusionValue('value');

        if ($text === '' || $text === null) {
            return '';
        }

        if (!is_string($text)) {
            throw new Exception(
                sprintf('Only strings can be processed by this Fusion object, given: "%s".', gettype($text)),
                1382624081
            );
        }

        $node = $this->fusionValue('node');

        if (!$node instanceof NodeInterface) {
            throw new Exception(
                sprintf('The current node must be an instance of NodeInterface, given: "%s".', gettype($node)),
                1382624088
            );
        }

        if (!$this->fusionValue('forceConversion') && $node->getContext()->getWorkspace()->getName() !== 'live') {
            return $text;
        }

        $unresolvedUris = [];
        $linkingService = $this->linkingService;
        $controllerContext = $this->runtime->getControllerContext();

        $absolute = $this->fusionValue('absolute');
        $this->setLightboxAttributes();

        $processedContent = preg_replace_callback(
            LinkingService::PATTERN_SUPPORTED_URIS,
            function (array $matches) use ($node, $linkingService, $controllerContext, &$unresolvedUris, $absolute) {
                $isLightboxNode = false;
                switch ($matches[1]) {
                    case 'node':
                        $targetObject = $linkingService->convertUriToObject($matches[0], $node);
                        if ($targetObject === null) {
                            $this->systemLogger->info(
                                sprintf(
                                    'Could not resolve "%s" to an existing node; The node was probably deleted.',
                                    $matches[0]
                                ),
                                LogEnvironment::fromMethodName(__METHOD__)
                            );
                            $resolvedUri = null;
                        } else {
                            $resolvedUri = $linkingService->createNodeUri(
                                $controllerContext,
                                $targetObject,
                                null,
                                null,
                                $absolute
                            );
                            //  @phpstan-ignore-next-line
                            $isLightboxNode = $targetObject
                                ->getNodeType()
                                ->isOfType('Litefyr.Integration:Document.Lightbox');
                        }
                        $cacheTagIdentifier = sprintf(
                            '%s_%s',
                            $this->cachingHelper->renderWorkspaceTagForContextNode(
                                $node->getContext()->getWorkspaceName()
                            ),
                            $matches[2]
                        );
                        $this->runtime->addCacheTag('node', $cacheTagIdentifier);
                        break;
                    case 'asset':
                        $resolvedUri = $linkingService->resolveAssetUri($matches[0]);
                        $cacheTagIdentifier = sprintf(
                            '%s_%s',
                            $this->cachingHelper->renderWorkspaceTagForContextNode(
                                $node->getContext()->getWorkspaceName()
                            ),
                            $matches[2]
                        );
                        $this->runtime->addCacheTag('asset', $cacheTagIdentifier);
                        break;
                    default:
                        $resolvedUri = null;
                }

                if ($resolvedUri === null) {
                    $unresolvedUris[] = $matches[0];
                    return $matches[0];
                }

                if ($isLightboxNode) {
                    return $resolvedUri . $this->lightboxAttributes;
                }
                return $resolvedUri;
            },
            $text
        );

        if ($unresolvedUris !== []) {
            $processedContent = preg_replace(
                '/<a(?:\s+[^>]*)?\s+href="(node|asset):\/\/[^"]+"[^>]*>(.*?)<\/a>/',
                '$2',
                $processedContent ?? ''
            );
            $processedContent = preg_replace(LinkingService::PATTERN_SUPPORTED_URIS, '', $processedContent ?? '');
        }

        return $this->replaceLinkTargets($processedContent ?? '');
    }

    /**
     * Replace the target attribute of link tags in processedContent with the target
     * specified by externalLinkTarget and resourceLinkTarget options.
     * Additionally set rel="noopener external" for external links.
     *
     * @param string $processedContent
     * @return string
     */
    protected function replaceLinkTargets($processedContent)
    {
        $setNoOpener = $this->fusionValue('setNoOpener');
        $setExternal = $this->fusionValue('setExternal');
        $externalLinkTarget = \trim((string) $this->fusionValue('externalLinkTarget'));
        $resourceLinkTarget = \trim((string) $this->fusionValue('resourceLinkTarget'));
        $lightboxAttributes = $this->lightboxAttributes;
        $attributesArray = $this->fusionValue('internAttributes') ?? [];

        $controllerContext = $this->runtime->getControllerContext();
        $host = $controllerContext->getRequest()->getHttpRequest()->getUri()->getHost();
        $processedContent = preg_replace_callback(
            '~<a\s+.*?href="(.*?)".*?>~i',
            static function ($matches) use (
                $externalLinkTarget,
                $resourceLinkTarget,
                $host,
                $setNoOpener,
                $setExternal,
                $lightboxAttributes,
                $attributesArray
            ) {
                [$linkText, $linkHref] = $matches;
                $uriHost = \parse_url($linkHref, PHP_URL_HOST);
                $target = null;
                $isExternalLink = \is_string($uriHost) && $uriHost !== $host;
                $isResourceLink =
                    str_contains($linkHref, '/_Assets/') ||
                    str_contains($linkHref, '/_Resources/') ||
                    str_contains($linkHref, '/media/thumbnail/');

                if ($externalLinkTarget && $externalLinkTarget !== '' && $isExternalLink) {
                    $target = $externalLinkTarget;
                }
                if ($resourceLinkTarget && $resourceLinkTarget !== '' && $isResourceLink) {
                    $target = $resourceLinkTarget;
                }
                if ($isExternalLink && $setNoOpener) {
                    $linkText = self::setAttribute('rel', 'noopener', $linkText);
                }
                if ($isExternalLink && $setExternal) {
                    $linkText = self::setAttribute('rel', 'external', $linkText);
                }

                if (!$isExternalLink && !$isResourceLink && strpos($linkText, $lightboxAttributes) === false) {
                    foreach ($attributesArray as $key => $value) {
                        if (!$value) {
                            continue;
                        }
                        $linkText = self::setAttribute($key, $value, $linkText);
                    }
                }

                if (is_string($target) && $target !== '') {
                    return self::setAttribute('target', $target, $linkText);
                }
                return $linkText;
            },
            $processedContent
        );

        return $processedContent ?? '';
    }

    private function setLightboxAttributes(): void
    {
        $result = '';
        $array = $this->fusionValue('lightboxAttributes') ?? [];
        foreach ($array as $key => $value) {
            if (!$value) {
                continue;
            }
            if ($value === true) {
                $result .= sprintf('" %s', $key);
                continue;
            }
            $result .= sprintf('" %s="%s', $key, $value);
        }

        $this->lightboxAttributes = $result;
    }

    /**
     * Set or add value to the a attribute
     *
     * @param string $attribute The attribute, ('target' or 'rel')
     * @param string $value The value of the attribute to add
     * @param string $content The content to parse
     * @return string
     */
    private static function setAttribute(string $attribute, string|bool $value, string $content): string
    {
        // The attribute is already set
        if (preg_match_all('~\s+' . $attribute . '="(.*?)~i', $content, $matches)) {
            // If the attribute is target or the value is already set, leave the attribute as it is
            if ($attribute === 'target' || preg_match('~' . $attribute . '=".*?' . $value . '.*?"~i', $content)) {
                return $content;
            }
            // Add the attribute to the list
            return preg_replace('/' . $attribute . '="(.*?)"/', sprintf('%s="$1 %s"', $attribute, $value), $content) ??
                '';
        }

        if ($value === true) {
            return str_replace('<a', sprintf('<a %s', $attribute), $content);
        }

        // Add the missing attribute with the value
        return str_replace('<a', sprintf('<a %s="%s"', $attribute, $value), $content);
    }
}
