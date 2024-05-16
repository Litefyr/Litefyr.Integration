<?php

namespace Litefyr\Integration\Command;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use Neos\Neos\Domain\Repository\DomainRepository;
use Neos\Neos\Domain\Repository\SiteRepository;

#[Flow\Scope('singleton')]
class DomainCommandController extends CommandController
{
    #[Flow\Inject]
    protected DomainRepository $domainRepository;

    #[Flow\Inject]
    protected SiteRepository $siteRepository;

    /**
     * Delete all domain records
     *
     * @return void
     */
    public function DeleteAllCommand(): void
    {
        $domains = $this->domainRepository->findAll();

        if (count($domains) === 0) {
            $this->outputLine('No domain entries available.');
            $this->quit(0);
        }

        foreach ($domains as $domain) {
            $site = $domain->getSite();
            if ($site->getPrimaryDomain() === $domain) {
                $site->setPrimaryDomain(null);
                $this->siteRepository->update($site);
            }
            $this->domainRepository->remove($domain);
            $this->outputLine('Domain entry "%s" deleted.', [$domain->getHostname()]);
        }
    }
}
