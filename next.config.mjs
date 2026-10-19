import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

let revision = 'unknown';
try {
  revision = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  // ignore
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
  ['/unhide', '/control-channel/show'],
  ['/inviteuser', '/control-channel/invite'],
  ['/setup', '/quickstart'],
  ['/commands', '/control-channel'],
  // Dashboard rework 2026-10: the docs used to follow the old dashboard tabs
  // (Basics, Feature, Access, Others). Old links, including the ones older
  // dashboard builds point to, land on the matching new page.
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
  // Short aliases of the removed pages (the flat aliases are built from
  // current file names, so these would otherwise 404).
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
