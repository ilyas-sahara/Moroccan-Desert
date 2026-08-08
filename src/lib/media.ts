export type Embed = { type: 'youtube' | 'vimeo' | 'file'; src: string };

export function getEmbed(url: string): Embed | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/);
  if (yt) return { type: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: 'vimeo', src: `https://player.vimeo.com/video/${vimeo[1]}` };
  if (url.match(/\.(mp4|webm|ogv|ogg|m4v|mov)(\?.*)?$/i)) return { type: 'file', src: url };
  return null;
}

export function isVideoUrl(url: string): boolean {
  return getEmbed(url) !== null;
}
