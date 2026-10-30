import { getPageImage, source } from '@/lib/source';
import { BRAND_COLOR } from '@/lib/brand';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = false;

const PAGE = '#2b2d31';
const TEXT = '#dde2f0';

const fontDir = join(process.cwd(), 'src/assets/fonts');

function OGImage({ title, description, avatarSrc }: { title: string; description?: string; avatarSrc: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '72px 80px',
        background: PAGE,
        color: TEXT,
        fontFamily: 'Bricolage Grotesque',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarSrc} alt="" width={64} height={64} style={{ borderRadius: '50%' }} />
        <div style={{ fontSize: 44, fontWeight: 800, color: '#ffffff', letterSpacing: '-1px' }}>Horizon</div>
        <div style={{ fontSize: 44, fontWeight: 800, color: BRAND_COLOR, letterSpacing: '-1px' }}>Documentation</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-2px',
            color: '#ffffff',
            display: 'block',
            lineClamp: 2,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.35,
              color: 'rgba(221,226,240,0.75)',
              maxWidth: 1000,
              display: 'block',
              lineClamp: 3,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          paddingLeft: 24,
          borderLeft: `3px solid ${BRAND_COLOR}`,
          fontSize: 32,
          fontWeight: 800,
          color: 'rgba(221,226,240,0.75)',
        }}
      >
        <div>docs.horizon-bot.me</div>
        <div style={{ color: 'rgba(221,226,240,0.35)' }}>-</div>
        <div>Temporary Voice Channels for Discord</div>
      </div>
    </div>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const avatarBuffer = readFileSync(join(process.cwd(), 'public/img/horizon-prod.png'));
  const avatarSrc = `data:image/png;base64,${avatarBuffer.toString('base64')}`;

  return new ImageResponse(
    <OGImage title={page.data.title} description={page.data.description} avatarSrc={avatarSrc} />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Bricolage Grotesque', data: readFileSync(join(fontDir, 'BricolageGrotesque-ExtraBold.ttf')), weight: 800, style: 'normal' },
        { name: 'Bricolage Grotesque', data: readFileSync(join(fontDir, 'BricolageGrotesque-Medium.ttf')), weight: 500, style: 'normal' },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
