<?php

namespace Litefyr\Integration;

use Neos\ContentRepository\Domain\Model\Node;
use Neos\Flow\Core\Bootstrap;
use Neos\Flow\Package\Package as BasePackage;
use Neos\Neos\Routing\Cache\RouteCacheFlusher;
use Neos\Neos\Utility\NodeUriPathSegmentGenerator;

/**
 * The Node Templates Magic Package
 */
class Package extends BasePackage
{
    /**
     * @param Bootstrap $bootstrap The current bootstrap
     * @return void
     */
    public function boot(Bootstrap $bootstrap)
    {
        $dispatcher = $bootstrap->getSignalSlotDispatcher();

        // Sync uri with title
        // - Litefyr.Integration:Mixin.SynUriPathSegmentWithTitle
        // - Litefyr.Integration:Mixin.SynUriPathSegmentWithTitle.Backend

        $newUriPathSegment = null;
        $dispatcher->connect(Node::class, 'nodePropertyChanged', function (
            Node $node,
            $propertyName,
            $oldValue,
            $newValue
        ) use ($bootstrap, &$newUriPathSegment) {
            if ($propertyName === 'uriPathSegment' && isset($newUriPathSegment) && $newValue !== $newUriPathSegment) {
                $node->setProperty('uriPathSegment', $newUriPathSegment);
                $newUriPathSegment = null;
            } elseif ($propertyName !== 'title') {
                return;
            }

            $isSync = $node->getNodeType()->isOfType('Litefyr.Integration:Mixin.SynUriPathSegmentWithTitle');
            $isBackendSync = $node
                ->getNodeType()
                ->isOfType('Litefyr.Integration:Mixin.SynUriPathSegmentWithTitle.Backend');

            if (!$isSync && !$isBackendSync) {
                return;
            }

            $nodeUriPathSegmentGenerator = $bootstrap->getObjectManager()->get(NodeUriPathSegmentGenerator::class);
            $prefix = $isBackendSync ? '_' : '';
            // @phpstan-ignore-next-line
            $newUriPathSegment = $prefix . strtolower($nodeUriPathSegmentGenerator->generateUriPathSegment($node));
            $node->setProperty('uriPathSegment', $newUriPathSegment);
            // @phpstan-ignore-next-line
            $bootstrap->getObjectManager()->get(RouteCacheFlusher::class)->registerNodeChange($node);
        });
    }
}
