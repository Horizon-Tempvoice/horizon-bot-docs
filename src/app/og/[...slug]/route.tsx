import { getPageImage, source } from '@/lib/source';
import { BRAND_COLOR } from '@/lib/brand';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = false;

function OGImage({ title, description, avatarSrc }: { title: string; description?: string; avatarSrc: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px',
        backgroundColor: '#16161e',
        color: '#fff',
      }}
    >
      {/* Top: Avatar + Site name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt=""
          width={56}
          height={56}
          style={{ borderRadius: '50%' }}
        />
        <span style={{ fontSize: '32px', fontWeight: 600, color: '#7dd3fc' }}>
          Horizon - Tempvoice System
        </span>
      </div>

      {/* Middle: Title + Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#fff',
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(240,240,240,0.75)',
              lineHeight: 1.4,
              display: '-webkit-box',
              overflow: 'hidden',
            }}
          >
            {description}
          </div>
        )}
      </div>

      {/* Bottom: subtle separator line */}
      <div
        style={{
          height: '3px',
          borderRadius: '9999px',
          background: BRAND_COLOR,
          width: '100%',
        }}
      />
    </div>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const locale = slug[0];
  const page = source.getPage(slug.slice(1, -1), locale);
  if (!page) notFound();

  const avatarBuffer = readFileSync(join(process.cwd(), 'public/img/horizon-prod.png'));
  const avatarSrc = `data:image/png;base64,${avatarBuffer.toString('base64')}`;

  return new ImageResponse(
    <OGImage
      title={page.data.title}
      description={page.data.description}
      avatarSrc={avatarSrc}
    />,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
