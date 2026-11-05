import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const BASE_URL = 'https://horizon-bot.me/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => {
    const lastModified = page.data.lastModified
      ? new Date(page.data.lastModified)
      : undefined;

    return {
      url: `${BASE_URL}${page.url === '/' ? '' : page.url}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: page.url === '/' ? 0.8 : 0.6,
    };
  });
}
