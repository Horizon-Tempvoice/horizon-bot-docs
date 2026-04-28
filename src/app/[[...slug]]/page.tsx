import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/layout.shared';
import Link from 'next/link';
import { icons } from 'lucide-react';
import { findPath } from 'fumadocs-core/page-tree';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const parentPage =
    page.slugs.length > 1 ? source.getPage([page.slugs[0]]) : null;

  const parentIconName = parentPage?.data.icon as string | undefined;
  const ParentIcon = parentIconName ? icons[parentIconName as keyof typeof icons] : null;

  const tree = source.getPageTree();
  const treePath = findPath(tree.children, (node) => node.type === 'page' && node.url === page.url, { includeSeparator: true });
  const categoryLabel = treePath?.find((n) => n.type === 'separator')?.name ?? null;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} breadcrumb={{ enabled: false }}>
      {(parentPage || categoryLabel) && (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-1">
          {parentPage ? (
            <Link
              href={`/${page.slugs[0]}`}
              className="inline-flex items-center gap-1.5 text-fd-primary hover:opacity-80 transition-opacity"
            >
              {ParentIcon && <ParentIcon className="size-3.5 shrink-0" />}
              {parentPage.data.title}
            </Link>
          ) : (
            <span className="text-fd-primary">{categoryLabel}</span>
          )}
          <span className="text-fd-muted-foreground" aria-hidden>›</span>
          <span className="text-fd-primary">{page.data.title}</span>
        </div>
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <div className="flex flex-row items-center gap-2 mt-8 text-sm text-fd-muted-foreground">
        {page.data.lastModified && (
          <span>
            Last updated at{' '}
            {new Date(page.data.lastModified).toLocaleString('en', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
        {process.env.NEXT_PUBLIC_GIT_REVISION && (
          <>
            {page.data.lastModified && <span>•</span>}
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/commit/${process.env.NEXT_PUBLIC_GIT_REVISION}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground transition-colors"
            >
              Commit {process.env.NEXT_PUBLIC_GIT_REVISION}
            </a>
          </>
        )}
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
