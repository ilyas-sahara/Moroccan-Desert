const PEXELS_HOST = 'images.pexels.com';

export type ResponsiveImageAttrs = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

type ResponsiveImageOptions = {
  sizes?: string;
  widths?: number[];
  baseWidth?: number;
};

export function responsiveImage(
  src: string,
  { sizes = '100vw', widths = [400, 800, 1200, 1600], baseWidth = 1200 }: ResponsiveImageOptions = {},
): ResponsiveImageAttrs {
  try {
    const parsed = new URL(src);
    if (parsed.hostname !== PEXELS_HOST) return { src };
    const base = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
    const srcSet = widths.map((w) => `${base}?auto=compress&cs=tinysrgb&w=${w} ${w}w`).join(', ');
    return { src: `${base}?auto=compress&cs=tinysrgb&w=${baseWidth}`, srcSet, sizes };
  } catch {
    return { src };
  }
}