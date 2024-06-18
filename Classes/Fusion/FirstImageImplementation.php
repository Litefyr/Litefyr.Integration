<?php

namespace Litefyr\Integration\Fusion;

use Litefyr\Integration\Service\FirstImageService;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Fusion\FusionObjects\AbstractFusionObject;

class FirstImageImplementation extends AbstractFusionObject
{
    #[Flow\Inject]
    protected FirstImageService $firstImageService;

    public function getNode(): NodeInterface
    {
        return $this->fusionValue('node');
    }

    public function getProperties(): array
    {
        return $this->fusionValue('properties');
    }

    public function getAlternativeTextProperty(): string
    {
        return $this->fusionValue('alternativeTextProperty');
    }

    public function evaluate(): ?array
    {
        $node = $this->getNode();
        $properties = $this->getProperties();
        $alternativeTextProperty = $this->getAlternativeTextProperty();
        return $this->firstImageService->getImage($node, $properties, $alternativeTextProperty);
    }
}
