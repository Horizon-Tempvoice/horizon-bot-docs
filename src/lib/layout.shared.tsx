import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { withBase } from '@/lib/base';

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
          src={withBase('/img/horizon-prod.png')}
          alt="Horizon"
          width={32}
          height={32}
          className="size-8 rounded-full"
        />
        <span className="font-display text-xl font-extrabold tracking-tight">Horizon</span>
      </>
    ),
  },
  themeSwitch: { enabled: false },
};
