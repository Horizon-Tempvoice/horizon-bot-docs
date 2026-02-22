import { createMDX } from 'fumadocs-mdx/next';
import { execSync } from 'node:child_process';

const withMDX = createMDX();

let revision = 'unknown';
try {
  revision = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  // ignore
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_GIT_REVISION: revision,
  },
  async rewrites() {
    return [
      {
        source: '/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
};

export default withMDX(config);
