import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'horizon-tempvoice',
  repo: 'horizon-bot-docs',
  branch: 'main',
};

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    // We'll render a custom language switcher in the sidebar banner
    i18n: false,
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
}
