<?php

namespace Litespeed\Theme\Http;

use GuzzleHttp\Psr7\ServerRequest;
use GuzzleHttp\Psr7\Uri;
use Neos\Flow\Cli\CommandRequestHandler;
use Neos\Flow\Http\HttpRequestHandlerInterface;

class CommandHttpRequestHandler extends CommandRequestHandler implements
    HttpRequestHandlerInterface
{
    public function getHttpRequest()
    {
        return new ServerRequest('GET', new Uri('http://localhost'));
    }

    public function getPriority(): int
    {
        return 200;
    }
}
