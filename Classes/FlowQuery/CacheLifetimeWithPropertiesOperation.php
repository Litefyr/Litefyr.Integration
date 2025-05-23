<?php

namespace Litefyr\Integration\FlowQuery;

use Neos\ContentRepository\Domain\Projection\Content\TraversableNodeInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Eel\FlowQuery\Operations\AbstractOperation;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Utility\Now;
use Neos\ContentRepository\Domain\Model\NodeInterface;

// Borrowed from Neos.ContentRepository/Classes/Eel/FlowQueryOperations/CacheLifetimeOperation.php
class CacheLifetimeWithPropertiesOperation extends AbstractOperation
{
    /**
     * @var string
     */
    protected static $shortName = 'cacheLifetimeWithProperties';

    /**
     * @var integer
     */
    protected static $priority = 1;

    /**
     * @var boolean
     */
    protected static $final = true;

    #[Flow\Inject(lazy: false)]
    protected Now $now;

    /**
     * @param array $context $context onto which this operation should be applied (array or array-like object)
     * @return boolean true if the operation can be applied onto the $context, false otherwise
     */
    public function canEvaluate($context)
    {
        return count($context) === 0 || (isset($context[0]) && $context[0] instanceof TraversableNodeInterface);
    }

    /**
     * @param FlowQuery $flowQuery The FlowQuery object
     * @param array $arguments hiddenBeforeDateTimes hiddenAfterDateTimes
     * @return integer The cache lifetime in seconds or NULL if either no content collection was given or no child node had a "hiddenBeforeDateTime" or "hiddenAfterDateTime" property set
     */
    public function evaluate(FlowQuery $flowQuery, array $arguments)
    {
        $hiddenBeforeDateTimes = $arguments['hiddenBeforeDateTimes'] ?? null;
        $hiddenAfterDateTimes = $arguments['hiddenAfterDateTimes'] ?? null;

        $minimumDateTime = null;
        foreach ($flowQuery->getContext() as $contextNode) {
            if ($contextNode instanceof NodeInterface) {
                $hiddenBeforeDateTime = $contextNode->getHiddenBeforeDateTime();
                if ($hiddenBeforeDateTime === null && isset($hiddenBeforeDateTimes)) {
                    // Ckeck also for custom hiddenBeforeDateTimes
                    $dates = [];
                    foreach ($hiddenBeforeDateTimes as $property) {
                        if (!$property) {
                            continue;
                        }
                        $value = $contextNode->getProperty($property) ?? null;
                        if ($value !== null) {
                            $dates[] = $value;
                        }
                    }
                    if (count($dates) > 0) {
                        $hiddenBeforeDateTime = min($dates);
                    }
                }
                if (
                    $hiddenBeforeDateTime !== null &&
                    $hiddenBeforeDateTime > $this->now &&
                    ($minimumDateTime === null || $hiddenBeforeDateTime < $minimumDateTime)
                ) {
                    $minimumDateTime = $hiddenBeforeDateTime;
                }
                $hiddenAfterDateTime = $contextNode->getHiddenAfterDateTime();
                if ($hiddenAfterDateTime === null && isset($hiddenAfterDateTimes)) {
                    // Ckeck also for custom hiddenAfterDateTimes
                    $dates = [];
                    foreach ($hiddenAfterDateTimes as $property) {
                        if (!$property) {
                            continue;
                        }
                        $value = $contextNode->getProperty($property) ?? null;
                        if ($value !== null) {
                            $dates[] = $value;
                        }
                    }
                    if (count($dates) > 0) {
                        $hiddenAfterDateTime = min($dates);
                    }
                }
                if (
                    $hiddenAfterDateTime !== null &&
                    $hiddenAfterDateTime > $this->now &&
                    ($minimumDateTime === null || $hiddenAfterDateTime < $minimumDateTime)
                ) {
                    $minimumDateTime = $hiddenAfterDateTime;
                }
            }
        }

        if ($minimumDateTime !== null) {
            $maximumLifetime = $minimumDateTime->getTimestamp() - $this->now->getTimestamp();
            if ($maximumLifetime > 0) {
                return $maximumLifetime;
            }
        }
        return null;
    }
}
