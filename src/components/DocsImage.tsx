import NextImage, { type ImageProps } from 'next/image';
import { withBase } from '@/lib/base';

export function DocsImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? withBase(props.src) : props.src;
  return <NextImage {...props} src={src} />;
}
