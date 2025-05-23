<?php

namespace Litefyr\Integration\Service;

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\ContentRepository\Domain\Projection\Content\TraversableNodeInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Flow\Annotations as Flow;
use Neos\ContentRepository\Domain\NodeAggregate\NodeName;

#[Flow\Proxy(false)]
class StartingPointService
{
    /**
     * @param NodeInterface|null $node
     * @param array{rootNodeType?:string,nodeTypes?:string[],path?:string}|null $arguments
     * @return TraversableNodeInterface[]
     */
    public static function getNodes(?NodeInterface $node = null, ?array $arguments = null): array
    {
        if (!$node) {
            return [];
        }
        $node = self::getRootNode($node, $arguments['rootNodeType'] ?? null);
        $node = self::childrenByPath($node, $arguments['path'] ?? null);
        return self::filterNodeTypes($node, $arguments['nodeTypes'] ?? null);
    }

    /**
     * Get children by path
     *
     * @param TraversableNodeInterface $node
     * @param string|null $path
     * @return TraversableNodeInterface
     */
    private static function childrenByPath(
        TraversableNodeInterface $node,
        ?string $path = null
    ): TraversableNodeInterface {
        if (!$path) {
            return $node;
        }
        $pathSegments = explode('/', $path);
        foreach ($pathSegments as $nameAsString) {
            $name = NodeName::fromString($nameAsString);
            $node = $node->findNamedChildNode($name);
        }
        return $node;
    }

    /**
     * Filter nodes by node types
     *
     * @param TraversableNodeInterface $node
     * @param string[]|null $nodeTypes
     * @return TraversableNodeInterface[]
     */
    private static function filterNodeTypes(TraversableNodeInterface $node, ?array $nodeTypes = null): array
    {
        if (!$nodeTypes) {
            $nodeTypes = ['Neos.Neos:Document'];
        }
        $nodeTypesFilter = implode(',', array_map(fn($nodeType) => '[instanceof ' . $nodeType . ']', $nodeTypes));
        $flowQuery = new FlowQuery([$node]);
        // @phpstan-ignore-next-line
        return $flowQuery->find($nodeTypesFilter)->get();
    }

    /**
     * Get root node by calling closest on the FlowQuery
     *
     * @param NodeInterface $node
     * @param string|null $rootNodeType
     * @return TraversableNodeInterface
     */
    private static function getRootNode(NodeInterface $node, ?string $rootNodeType = null): TraversableNodeInterface
    {
        if (!$rootNodeType) {
            /** @var TraversableNodeInterface $node  */
            return $node;
        }
        $flowQuery = new FlowQuery([$node]);
        // @phpstan-ignore-next-line
        return $flowQuery->closest('[instanceof ' . $rootNodeType . ']')->get(0);
    }
}
