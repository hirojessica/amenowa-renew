const escapeAttribute = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function publicSiteUrl(value = process.env.SITE_URL || 'https://hirojessica.github.io/amenowa-renew/') {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('SITE_URL must be a public HTTPS URL without credentials, query or fragment.');
  }
  url.pathname = `${url.pathname.replace(/\/$/, '')}/`;
  return url.href;
}

export function socialMeta(page, route, siteUrl = publicSiteUrl()) {
  const url = new URL(route === '404/' ? '404.html' : route, siteUrl).href;
  const image = new URL('assets/ogp-amenowa-v1.png', siteUrl).href;
  const imageAlt = 'amenowaの公式ロゴと「水を測る。水を知る。水の未来を、ともにつくる。」のメッセージ。白地にコーポレートカラーの青い波。';
  const og = {
    'og:type': page.type || 'website',
    'og:site_name': 'amenowa',
    'og:locale': 'ja_JP',
    'og:title': page.title,
    'og:description': page.description,
    'og:url': url,
    'og:image': image,
    'og:image:type': 'image/png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': imageAlt,
  };
  if (page.publishedTime) og['article:published_time'] = page.publishedTime;
  const twitter = {
    'twitter:card': 'summary_large_image',
    'twitter:title': page.title,
    'twitter:description': page.description,
    'twitter:image': image,
    'twitter:image:alt': imageAlt,
  };
  return [
    `<link rel="canonical" href="${escapeAttribute(url)}" />`,
    ...Object.entries(og).map(([key, value]) => `<meta property="${key}" content="${escapeAttribute(value)}" />`),
    ...Object.entries(twitter).map(([key, value]) => `<meta name="${key}" content="${escapeAttribute(value)}" />`),
  ].join('\n    ');
}
