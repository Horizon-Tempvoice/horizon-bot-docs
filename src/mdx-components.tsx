import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DiscordButton } from '@/components/DiscordButton';
import { ImageWithCaption, ImageRow } from '@/components/ImageWithCaption';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DiscordButton,
    ImageWithCaption,
    ImageRow,
    ...components,
  };
}
