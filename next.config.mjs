import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

let revision = 'unknown';
try {
  revision = execSync('git rev-parse --short HEAD').toString().trim();
} catch {
  revision = 'unknown';
}

const DOCS_CONTENT = join(process.cwd(), 'content', 'docs');
const SECTION_PRIORITY = ['control-channel', 'session', 'configure-channel'];

function collectRoutes(relDir = '') {
  let entries;
  try {
    entries = readdirSync(join(DOCS_CONTENT, relDir), { withFileTypes: true });
  } catch {
    return [];
  }
  const routes = [];
  for (const entry of entries) {
    const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      routes.push(...collectRoutes(rel));
    } else if (entry.isFile() && entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
      routes.push(`/${rel.replace(/\.mdx$/, '')}`);
    }
  }
  return routes;
}

function sectionRank(route) {
  const section = route.split('/').filter(Boolean)[0];
  const index = SECTION_PRIORITY.indexOf(section);
  return index === -1 ? SECTION_PRIORITY.length : index;
}

function buildFlatAliases() {
  const bySlug = new Map();
  for (const route of collectRoutes()) {
    const parts = route.split('/').filter(Boolean);
    if (parts.length < 2) continue;
    const slug = parts[parts.length - 1];
    const existing = bySlug.get(slug);
    if (!existing || sectionRank(route) < sectionRank(existing)) {
      bySlug.set(slug, route);
    }
  }
  return [...bySlug.entries()].map(([slug, destination]) => [`/${slug}`, destination]);
}

const legacyAliases = [
  ['/unhide', '/control-channel/hide#show'],
  ['/control-channel/unhide', '/control-channel/hide#show'],
  ['/configure-channel', '/configure-channel/overview'],
  ['/inviteuser', '/control-channel/invite'],
  ['/setup', '/quickstart'],
  ['/commands', '/control-channel'],
  ['/configure-channel/basics', '/configure-channel/generator'],
  ['/configure-channel/basics/channel_defaults', '/configure-channel/generator/size_and_audio'],
  ['/configure-channel/basics/visibility', '/configure-channel/generator/placement_and_privacy'],
  ['/configure-channel/features', '/configure-channel/generator/owner_tools'],
  ['/configure-channel/features/toggle_features', '/configure-channel/generator/owner_tools'],
  ['/configure-channel/features/settings', '/configure-channel/generator/owner_tools'],
  ['/configure-channel/features/modlog', '/configure-channel/generator/logging'],
  ['/configure-channel/access', '/configure-channel/generator/who_can_join'],
  ['/configure-channel/access/access_roles', '/configure-channel/generator/who_can_join#access-roles'],
  ['/configure-channel/access/immune_roles', '/configure-channel/generator/who_can_join#immune-roles'],
  ['/configure-channel/others', '/configure-channel/generator'],
  ['/configure-channel/others/lfm_channel', '/configure-channel/generator/looking_for_members'],
  ['/configure-channel/others/profiles', '/configure-channel/generator/saved_profiles'],
  ['/configure-channel/others/deletion_delay', '/configure-channel/generator/deleting_empty_channels'],
  ['/configure-channel/others/knock', '/configure-channel/generator/knocking'],
  ['/configure-channel/server_settings', '/configure-channel/server/settings'],
  ['/channel_defaults', '/configure-channel/generator/size_and_audio'],
  ['/visibility', '/configure-channel/generator/placement_and_privacy'],
  ['/toggle_features', '/configure-channel/generator/owner_tools'],
  ['/modlog', '/configure-channel/generator/logging'],
  ['/access_roles', '/configure-channel/generator/who_can_join#access-roles'],
  ['/immune_roles', '/configure-channel/generator/who_can_join#immune-roles'],
  ['/lfm_channel', '/configure-channel/generator/looking_for_members'],
  ['/profiles', '/configure-channel/generator/saved_profiles'],
  ['/deletion_delay', '/configure-channel/generator/deleting_empty_channels'],
  ['/server_settings', '/configure-channel/server/settings'],
  ['/features', '/configure-channel/generator/logging#member-log'],
  ['/control-channel/show', '/control-channel/hide#show'],
  ['/control-channel/unlock', '/control-channel/lock#unlock'],
  ['/control-channel/untrust', '/control-channel/trust#untrust'],
  ['/control-channel/unblock', '/control-channel/block#unblock'],
  ['/show', '/control-channel/hide#show'],
  ['/unlock', '/control-channel/lock#unlock'],
  ['/untrust', '/control-channel/trust#untrust'],
  ['/unblock', '/control-channel/block#unblock'],
  ['/session/save', '/session#save'],
  ['/session/activate', '/session#activate'],
  ['/session/skip', '/session#skip'],
  ['/session/show', '/session#show'],
  ['/session/rename', '/session#rename'],
  ['/session/delete', '/session#delete'],
  ['/session/autosave', '/session#autosave'],
  ['/save', '/session#save'],
  ['/activate', '/session#activate'],
  ['/skip', '/session#skip'],
  ['/rename', '/session#rename'],
  ['/delete', '/session#delete'],
  ['/autosave', '/session#autosave'],
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/docs',
  allowedDevOrigins: ['192.168.1.26', '127.0.0.1'],
  env: {
    NEXT_PUBLIC_GIT_REVISION: revision,
  },
  async redirects() {
    const flatAliases = buildFlatAliases();
    const flatSources = new Set(flatAliases.map(([source]) => source));
    const aliases = [
      ...flatAliases,
      ...legacyAliases.filter(([source]) => !flatSources.has(source)),
    ];
    return [
      ...aliases.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
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
