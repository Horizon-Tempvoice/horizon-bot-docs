export const BASE_PATH = '/docs';

export const SITE_URL = 'https://horizon-bot.me';
export const DOCS_URL = `${SITE_URL}${BASE_PATH}`;

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
