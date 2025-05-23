<?php

namespace Litefyr\Integration\FlowQuery;

use Neos\ContentRepository\Domain\Projection\Content\NodeInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Eel\FlowQuery\Operations\AbstractOperation;
use Neos\Flow\Utility\Now;
use Neos\Flow\Annotations as Flow;
use DateTime;

class FilterByDateBeforeOperation extends AbstractOperation
{
    /**
     * {@inheritdoc}
     *
     * @var string
     */
    protected static $shortName = 'filterByDateBefore';

    /**
     * @var integer
     */
    protected static $priority = 100;

    #[Flow\Inject(lazy: false)]
    protected Now $now;

    /**
     * {@inheritdoc}
     *
     * @param FlowQuery $flowQuery The FlowQuery object
     * @param array $arguments hiddenBeforeDateTimes hiddenAfterDateTimes
     * @return integer The cache lifetime in seconds or NULL if either no content collection was given or no child node had a "hiddenBeforeDateTime" or "hiddenAfterDateTime" property set
     */
    public function evaluate(FlowQuery $flowQuery, array $arguments)
    {
        if (!isset($arguments[0]) || empty($arguments[0])) {
            return;
        }
        $property = $arguments[0];

        $filteredContext = [];
        foreach ($flowQuery->getContext() as $contextNode) {
            if ($contextNode instanceof NodeInterface) {
                $hiddenBeforeDateTime = $contextNode->getProperty($property) ?: null;
                if ($hiddenBeforeDateTime instanceof DateTime) {
                    if ($hiddenBeforeDateTime <= $this->now) {
                        $filteredContext[] = $contextNode;
                    }
                } else {
                    $filteredContext[] = $contextNode;
                }
            }
        }
        $flowQuery->setContext($filteredContext);
    }
}
