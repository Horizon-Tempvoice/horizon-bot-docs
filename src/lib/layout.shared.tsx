import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'horizon-tempvoice',
  repo: 'horizon-bot-docs',
  branch: 'main',
};

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/horizon-prod.png"
          alt="Horizon"
          width={24}
          height={24}
          className="rounded-full"
        />
        Horizon
      </>
    ),
  },
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
};
