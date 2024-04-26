<?php

namespace Litespeed\Integration\Command;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use Neos\Flow\Log\Utility\LogEnvironment;
use Psr\Log\LoggerInterface;

#[Flow\Scope('singleton')]
class StartupCommandController extends CommandController
{
    #[Flow\Inject]
    protected LoggerInterface $logger;

    #[Flow\InjectConfiguration('flowCommandsOnStartup')]
    protected $flowCommandsOnStartup;

    /**
     * Run all defined cli commands on startup
     *
     * @return void
     */
    public function initCommand(): void
    {
        $commands = $this->flowCommandsOnStartup;
        if (!isset($commands) || !is_array($commands) || !count($commands)) {
            $this->outputFormatted(
                '<comment> No CLI startup command set. </comment>'
            );
        }

        ksort($commands);

        foreach ($commands as $key => $packagesCommands) {
            if (!isset($packagesCommands)) {
                break;
            }
            if (is_string($packagesCommands)) {
                $packagesCommands = [$packagesCommands];
            }
            if (!is_array($commands) || !count($commands)) {
                break;
            }

            $this->outputFormatted('');
            $this->outputFormatted(
                '<comment> Run following Flow commands for %s </comment>',
                [$key]
            );

            foreach ($packagesCommands as $singleCommand) {
                exec(
                    sprintf(
                        'cd %s && php flow %s',
                        FLOW_PATH_ROOT,
                        $singleCommand
                    )
                );
                $this->logger->info(
                    sprintf('Run Flow command: `%s`', $singleCommand),
                    LogEnvironment::fromMethodName(__METHOD__)
                );
                $this->outputFormatted('%s', [$singleCommand], 5);
            }
        }
    }
}
