const LOCAL_RASTER_EXTENSION = /\.(png|jpe?g)(?=([?#]|$))/i;

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

export function preferWebpImageUrl(url?: string | null, siteUrl = '') {
  if (!url) return url;

  if (url.startsWith('/')) {
    return url.replace(LOCAL_RASTER_EXTENSION, '.webp');
  }

  const normalizedSiteUrl = stripTrailingSlash(siteUrl);

  if (normalizedSiteUrl && url.startsWith(`${normalizedSiteUrl}/`)) {
    const localPath = url.slice(normalizedSiteUrl.length);
    return `${normalizedSiteUrl}${localPath.replace(LOCAL_RASTER_EXTENSION, '.webp')}`;
  }

  return url;
}

export function preferWebpInHtml(html: string, siteUrl = '') {
  return html.replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (match, prefix, src, suffix) => {
    const optimizedSrc = preferWebpImageUrl(src, siteUrl);

    return optimizedSrc ? `${prefix}${optimizedSrc}${suffix}` : match;
  });
}
