import NextImage, { type ImageProps } from 'next/image';
import { withBase } from '@/lib/base';

// next/image does not apply basePath to `src`, so prefix string srcs here.
// Static imports (object srcs) already resolve correctly and are passed through.
export function DocsImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? withBase(props.src) : props.src;
  return <NextImage {...props} src={src} />;
}
