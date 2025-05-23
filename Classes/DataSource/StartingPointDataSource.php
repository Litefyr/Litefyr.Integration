<?php

namespace Litefyr\Integration\DataSource;

use Litefyr\Integration\Service\StartingPointService;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Neos\Service\DataSource\AbstractDataSource;

class StartingPointDataSource extends AbstractDataSource
{
    protected static $identifier = 'litefyr-starting-point';

    /**
     * @param NodeInterface|null $node
     * @param array{rootNodeType?:string,nodeTypes?:string[],path?:string} $arguments
     * @return array<string, array{label:string}>
     */
    public function getData(NodeInterface $node = null, array $arguments = []): array
    {
        $findNodes = StartingPointService::getNodes($node, $arguments);
        $data = [];
        foreach ($findNodes as $foundNode) {
            $id = $foundNode->getNodeAggregateIdentifier()->__toString();
            $data[$id] = [
                'label' => $foundNode->getLabel(),
            ];
        }
        return $data;
    }
}
