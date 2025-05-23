<?php

namespace Litefyr\Integration\DataSource;

use Litefyr\Integration\Service\StartingPointService;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Neos\Service\DataSource\AbstractDataSource;
use Sandstorm\LazyDataSource\LazyDataSourceTrait;
use Neos\ContentRepository\Domain\Projection\Content\TraversableNodeInterface;

class LazyStartingPointDataSource extends AbstractDataSource
{
    use LazyDataSourceTrait;

    protected static $identifier = 'litefyr-starting-point-lazy';

    /**
     * @param array<string> $identifiers
     * @param NodeInterface|null $node
     * @param array<mixed> $arguments, not used
     * @return array<int|string, array{label: string}>
     */
    protected function getDataForIdentifiers(array $identifiers, NodeInterface $node = null, array $arguments = [])
    {
        if (!is_array($identifiers) || empty($identifiers)) {
            return [];
        }
        $data = [];
        $filter = implode(',', array_map(fn($id) => '#' . $id, $identifiers));
        $flowQuery = new FlowQuery([$node]);

        /** @var TraversableNodeInterface[] $findNodes */
        // @phpstan-ignore-next-line
        $findNodes = $flowQuery->find($filter)->get();

        foreach ($findNodes as $foundNode) {
            $id = $foundNode->getNodeAggregateIdentifier()->__toString();
            $data[$id] = [
                'label' => $foundNode->getLabel(),
            ];
        }
        return $data;
    }

    /**
     * @param string $searchTerm
     * @param NodeInterface|null $node
     * @param array{rootNodeType?:string,nodeTypes?:string[],path?:string} $arguments
     * @return array<int|string, array{label: string}>
     */
    protected function searchData(string $searchTerm, NodeInterface $node = null, array $arguments = [])
    {
        $findNodes = StartingPointService::getNodes($node, $arguments);
        $data = [];
        foreach ($findNodes as $foundNode) {
            $id = $foundNode->getNodeAggregateIdentifier()->__toString();
            $label = $foundNode->getLabel();
            if (stripos($label, $searchTerm) === false && stripos($id, $searchTerm) === false) {
                continue;
            }

            $data[$id] = [
                'label' => $label,
            ];
        }
        return $data;
    }
}
