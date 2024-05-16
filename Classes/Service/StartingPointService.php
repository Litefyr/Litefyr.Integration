<?php

namespace Litefyr\Integration\Service;

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\ContentRepository\Domain\Projection\Content\TraversableNodeInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Flow\Annotations as Flow;

#[Flow\Proxy(false)]
class StartingPointService
{
    /**
     * @param NodeInterface|null $node
     * @param array{rootNodeType?:string,nodeTypes?:string[]}|null $arguments
     * @return TraversableNodeInterface[]
     */
    public static function getNodes(?NodeInterface $node = null, ?array $arguments = null): array
    {
        if (!$node) {
            return [];
        }
        $rootNodeType = $arguments['rootNodeType'] ?? null;
        $nodeTypes = $arguments['nodeTypes'] ?? ['Neos.Neos:Document'];
        $nodeTypesFilter = implode(',', array_map(fn($nodeType) => '[instanceof ' . $nodeType . ']', $nodeTypes));
        if ($rootNodeType) {
            $rootFlowQuery = new FlowQuery([$node]);
            // @phpstan-ignore-next-line
            $node = $rootFlowQuery->closest('[instanceof ' . $rootNodeType . ']')->get(0);
        }
        $flowQuery = new FlowQuery([$node]);
        // @phpstan-ignore-next-line
        return $flowQuery->find($nodeTypesFilter)->get();
    }
}
