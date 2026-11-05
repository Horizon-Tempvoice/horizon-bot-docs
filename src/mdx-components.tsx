import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { DiscordButton } from '@/components/DiscordButton';
import {
  DiscordActionRow,
  DiscordCode,
  DiscordComponentButton,
  DiscordContainer,
  DiscordField,
  DiscordFields,
  DiscordFooter,
  DiscordHeading,
  DiscordMention,
  DiscordMessage,
  DiscordSeparator,
  DiscordSubtext,
  DiscordText,
  DiscordTime,
} from '@/components/DiscordMessage';
import { ImageWithCaption, ImageRow } from '@/components/ImageWithCaption';
import { MockStep } from '@/components/MockStep';
import PanelMock from '@/components/discord-mock/PanelMock';
import { TempChannelSteps } from '@/components/TempChannelSteps';
import { withBase } from '@/lib/base';

const DefaultImage = defaultMdxComponents.img!;

function Image(props: ComponentProps<typeof DefaultImage>) {
  const { src } = props;
  return <DefaultImage {...props} src={typeof src === 'string' ? withBase(src) : src} />;
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: Image,
    DiscordButton,
    DiscordMessage,
    DiscordContainer,
    DiscordText,
    DiscordHeading,
    DiscordSubtext,
    DiscordSeparator,
    DiscordMention,
    DiscordTime,
    DiscordActionRow,
    DiscordCode,
    DiscordField,
    DiscordFields,
    DiscordFooter,
    DiscordComponentButton,
    ImageWithCaption,
    ImageRow,
    TempChannelSteps,
    PanelMock,
    MockStep,
    ...components,
  };
}
