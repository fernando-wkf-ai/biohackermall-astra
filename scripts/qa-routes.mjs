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
for (const path of paths) {
  const r = await fetch(base + path);
  const h = await r.text();
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
for (const path of ['/sitemap.xml', '/robots.txt', '/not-a-page/']) {
  const r = await fetch(base + path);
  const h = await r.text();
  console.log(path, r.status, h.slice(0, 200));
  if (r.status !== (path === '/not-a-page/' ? 404 : 200)) failed = true;
}
process.exitCode = failed ? 1 : 0;
