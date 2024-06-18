<?php

namespace Litefyr\Integration\Service;

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Media\Domain\Model\AssetInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Flow\Annotations as Flow;

#[Flow\Proxy(false)]
class FirstImageService
{
    /**
     * @param NodeInterface $node
     * @param array $properties
     * @param string $alternativeTextProperty
     * @return array{node:NodeInterface,property:string,asset:AssetInterface,alternativeText:string,copyright:string}|null
     */
    public function getImage(
        NodeInterface $node,
        array $properties = ['image'],
        ?string $alternativeTextProperty = 'alternativeText'
    ): ?array {
        foreach ($properties as $property) {
            $array = $this->checkNode($node, $property, $alternativeTextProperty);
            if ($array) {
                // One property one direct on the node is found, we're done
                return $array;
            }
        }

        // No direct property found, let's check the children
        $flowQuery = new FlowQuery([$node]);
        $contentNodes = $flowQuery
            ->find('[instanceof Neos.Neos:ContentCollection]')
            ->find('[instanceof Neos.Neos:Content]')
            ->get();
        foreach ($contentNodes as $contentNode) {
            foreach ($properties as $property) {
                $array = $this->checkNode($contentNode, $property, $alternativeTextProperty);
                if ($array) {
                    return $array;
                }
            }
        }

        return null;
    }

    /**
     * @param NodeInterface $node
     * @param string $property
     * @param string $alternativeTextProperty
     * @return array{node:NodeInterface,property:string,asset:AssetInterface,alternativeText:string,copyright:string}|null
     */
    private function checkNode(NodeInterface $node, string $property, ?string $alternativeTextProperty = null): ?array
    {
        if (!$node->hasProperty($property)) {
            return null;
        }
        $asset = $node->getProperty($property);
        if ($asset instanceof AssetInterface) {
            $alternativeText =
                $alternativeTextProperty && $node->hasProperty($alternativeTextProperty)
                    ? $node->getProperty($alternativeTextProperty)
                    : '';
            $copyright = $asset->getCopyrightNotice();
            if (!$alternativeText) {
                $alternativeText = $asset->getCaption();
            }
            return [
                'node' => $node,
                'property' => $property,
                'asset' => $asset,
                'alternativeText' => $alternativeText,
                'copyright' => $copyright,
            ];
        }
        return null;
    }
}
