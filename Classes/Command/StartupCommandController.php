<?php

namespace Litefyr\Integration\Command;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use Neos\Flow\Log\Utility\LogEnvironment;
use Psr\Log\LoggerInterface;

#[Flow\Scope('singleton')]
class StartupCommandController extends CommandController
{
    #[Flow\Inject]
    protected LoggerInterface $logger;

    /** @var array<string, string|array<string>>|null $flowCommandsOnStartup */
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
            $this->outputFormatted('<comment> No CLI startup command set. </comment>');
            return;
        }

        ksort($commands);

        foreach ($commands as $key => $packagesCommands) {
            if (empty($packagesCommands)) {
                continue;
            }
            if (is_string($packagesCommands)) {
                $packagesCommands = [$packagesCommands];
            }
            if (!is_array($packagesCommands)) {
                continue;
            }

            $this->outputLine('');
            $this->outputLine('');
            $this->outputLine('<comment> Run following Flow commands for %s </comment>', [$key]);
            foreach ($packagesCommands as $singleCommand) {
                $this->outputFormatted('%s', [$singleCommand], 5);
            }

            foreach ($packagesCommands as $singleCommand) {
                // @phpstan-ignore-next-line
                exec(sprintf('cd %s && php flow %s', FLOW_PATH_ROOT, $singleCommand));
                $this->logger->info(
                    sprintf('Run Flow command: `%s`', $singleCommand),
                    LogEnvironment::fromMethodName(__METHOD__)
                );
            }
        }
    }
}
