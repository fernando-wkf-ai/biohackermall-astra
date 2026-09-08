export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin/', '/__debug/'] },
    sitemap: 'https://biohackermall.com/sitemap.xml',
  };
}

