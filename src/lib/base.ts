// The deployment sub-path. The docs are served under horizon-bot.me/docs.
// Must stay in sync with `basePath` in next.config.mjs.
export const BASE_PATH = '/docs';

// Prefix an app-absolute path (e.g. "/img/x.png") with BASE_PATH.
// Next only auto-prefixes next/link and next/router. Raw <img>, next/image
// `src`, metadata URLs and fetch() endpoints are not touched, so prefix them here.
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
