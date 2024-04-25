<?php

namespace Litespeed\Theme\EelHelper;

use Neos\Eel\ProtectedContextAwareInterface;
use Neos\Flow\Annotations as Flow;

class ThemeHelper implements ProtectedContextAwareInterface
{
    /**
     * Insert typewriter syntax into string
     *
     * @param string|null $string
     * @param boolean $enable
     * @param string|null $cssClass
     * @return string|null
     */
    public function typewriter(
        ?string $string = null,
        bool $enable = true,
        ?string $cssClass = null
    ): ?string {
        if (!$enable || !$string) {
            return $string;
        }

        $cssClass = $cssClass ? sprintf(' class="%s"', $cssClass) : '';
        $string = preg_replace_callback(
            '/\[([^]]*)\]/',
            function ($matches) use ($cssClass) {
                $parts = explode('|', $matches[1]);
                $text = $parts[0];
                return sprintf(
                    '<span%s x-data="{text:[\'%s\']}" x-typewriter="text">%s</span>',
                    $cssClass,
                    implode("','", $parts),
                    $text
                );
            },
            $string
        );
        return $string;
    }

    /**
     * Removes typewriter syntax from string
     *
     * @param string $string
     * @param boolean $enable
     * @return string
     */
    public function removeTypewriter(
        string $string,
        bool $enable = true
    ): string {
        if (!$enable) {
            return $string;
        }

        $string = preg_replace_callback(
            '/\[([^]]*)\]/',
            function ($matches) {
                $parts = explode('|', $matches[1]);
                return $parts[0];
            },
            $string
        );
        return $string;
    }

    /**
     * Returns the smallest number from an array
     *
     * @param array $array
     * @return integer
     */
    public function smallestNumberFromArray(array $array): int
    {
        return min($this->filterNumberArray($array));
    }

    /**
     * Returns the biggest number from an array
     *
     * @param array $array
     * @return integer
     */
    public function biggestNumberFromArray(array $array): int
    {
        return max($this->filterNumberArray($array));
    }

    /**
     * Return viewbox from SVG
     *
     * @param string|null $svg
     * @return string|null
     */
    public function getViewBox(?string $svg): ?string
    {
        if (!$svg) {
            return null;
        }

        preg_match('/viewBox="([^"]*)"/', $svg, $matches);
        return $matches[1] ?? null;
    }

    /**
     * Filters an array for numeric values
     *
     * @param array $array
     * @return array
     */
    private function filterNumberArray(array $array): array
    {
        return array_filter($array, function ($number) {
            return is_numeric($number);
        });
    }

    /**
     * All methods are considered safe
     *
     * @param string $methodName The name of the method
     * @return bool
     */
    public function allowsCallOfMethod($methodName)
    {
        return true;
    }
}
