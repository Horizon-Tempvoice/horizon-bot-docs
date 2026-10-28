import type * as PageTree from 'fumadocs-core/page-tree';
import { source } from '@/lib/source';

export const revalidate = false;

interface PageEntry {
  url: string;
  title: string;
  description?: string;
  category?: string;
  overview: boolean;
}

export function GET() {
  const pages = new Map(source.getPages().map((page) => [page.url, page.data]));
  const entries = new Map<string, PageEntry>();

  function add(url: string, category: string | undefined, overview: boolean) {
    const data = pages.get(url);
    if (!data || entries.has(url)) return;
    entries.set(url, { url, title: data.title, description: data.description, category, overview });
  }

  function walk(nodes: PageTree.Node[], category: string | undefined) {
    for (const node of nodes) {
      if (node.type === 'page') {
        add(node.url, category, false);
      } else if (node.type === 'folder') {
        if (node.index) add(node.index.url, category, true);
        walk(node.children, String(node.name));
      }
    }
  }

  walk(source.getPageTree().children, undefined);
  return Response.json([...entries.values()]);
}
