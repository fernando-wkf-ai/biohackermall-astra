const paths = [
  '/',
  '/zh-hk/',
  '/smartring/',
  '/zh-hk/smartring/',
  '/smartring/cost-calculator/',
  '/zh-hk/smartring/cost-calculator/',
  '/about/',
  '/zh-hk/about/',
  '/affiliate-disclosure/',
  '/zh-hk/affiliate-disclosure/',
  '/smartring/explainer/understanding-ownership-cost/',
  '/zh-hk/smartring/explainer/understanding-ownership-cost/',
];
let failed = false;
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const renderedPages = new Map();
for (const path of paths) {
  const r = await fetch(base + path);
  const h = await r.text();
  renderedPages.set(path, { status: r.status, html: h });
  const lang = h.match(/<html[^>]*lang="([^"]*)"/)?.[1];
  const canonical = h.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0];
  const h1 = (h.match(/<h1(?:\s|>)/g) || []).length;
  const ok =
    r.status === 200 &&
    h1 === 1 &&
    lang === (path.startsWith('/zh-hk') ? 'zh-HK' : 'en') &&
    canonical?.includes('https://biohackermall.com' + path) &&
    h.toLowerCase().includes('hreflang="en"') &&
    h.toLowerCase().includes('hreflang="zh-hk"');
  console.log(
    JSON.stringify({ path, status: r.status, lang, h1, canonical, ok }),
  );
  if (!ok) failed = true;
}
for (const path of ['/sitemap.xml', '/robots.txt', '/admin/', '/not-a-page/', '/zh-hk/not-a-page/', '/smartring/explainer/unpublished/', '/zh-hk/smartring/explainer/unpublished/']) {
  const r = await fetch(base + path);
  const h = await r.text();
  console.log(path, r.status, h.slice(0, 200));
  const expected = path.includes('not-a-page') || path.includes('unpublished') ? 404 : 200;
  if (r.status !== expected) failed = true;
}
// Check actual navigation links and fragment targets, not just known route names.
const links = new Set();
for (const [path, { html }] of renderedPages) {
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const match of markup.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const target = new URL(match[1].replaceAll('&amp;', '&'), base + path);
    if (target.origin === new URL(base).origin) links.add(target.href);
  }
}
let broken = 0;
for (const link of links) {
  const target = new URL(link);
  const path = target.pathname + target.search;
  let page = renderedPages.get(path);
  if (!page) {
    const response = await fetch(base + path);
    page = { status: response.status, html: await response.text() };
    renderedPages.set(path, page);
  }
  const id = decodeURIComponent(target.hash.slice(1));
  const ids = [...page.html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (page.status !== 200 || (id && !ids.includes(id))) {
    console.error('Broken internal link:', target.pathname + target.hash);
    broken++;
  }
}
console.log(`Internal links and anchors: ${links.size} checked, ${broken} broken.`);
if (broken) failed = true;
process.exitCode = failed ? 1 : 0;
