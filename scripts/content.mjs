import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: true,
});
const locales = ['en', 'zh-HK'];
const types = [
  'article',
  'comparison',
  'buying-guide',
  'explainer',
  'product-update',
  'decision-guide',
  'news',
];
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const date = /^\d{4}-\d{2}-\d{2}$/;
function assert(x, message) {
  if (!x) throw new Error(message);
}
function url(x) {
  try {
    return new URL(x).protocol === 'https:';
  } catch {
    return false;
  }
}
const all = [];
const routes = new Set();
const translations = new Set();
for (const folder of ['en', 'zh-hk'])
  for (const file of fs
    .readdirSync('content/' + folder)
    .filter((f) => f.endsWith('.md'))) {
    const raw = fs.readFileSync('content/' + folder + '/' + file, 'utf8');
    assert(/^---\r?\n/.test(raw), 'Use plain YAML frontmatter: ' + file);
    const { data: d, content } = matter(raw);
    for (const k of [
      'title',
      'slug',
      'translation_key',
      'excerpt',
      'category',
      'type',
      'author',
      'published_date',
      'updated_date',
      'locale',
      'seo_title',
      'meta_description',
    ])
      assert(
        typeof d[k] === 'string' && d[k].trim(),
        'Missing ' + k + ' in ' + file,
      );
    assert(content.trim(), 'Empty body: ' + file);
    assert(
      locales.includes(d.locale) &&
        d.locale === (folder === 'en' ? 'en' : 'zh-HK'),
      'Invalid locale: ' + file,
    );
    assert(
      slug.test(d.slug) && slug.test(d.category) && types.includes(d.type),
      'Invalid article route: ' + file,
    );
    assert(
      d.schema_type === 'Article' &&
        typeof d.published === 'boolean' &&
        typeof d.affiliate_disclosure === 'boolean',
      'Invalid publishing/schema flags: ' + file,
    );
    assert(
      Array.isArray(d.tags) && d.tags.every((x) => typeof x === 'string'),
      'Invalid tags',
    );
    assert(
      Array.isArray(d.sources) && d.sources.every((s) => s.label && url(s.url)),
      'Invalid sources',
    );
    assert(
      date.test(d.published_date) &&
        date.test(d.updated_date) &&
        (!d.last_verified_date || date.test(d.last_verified_date)),
      'Invalid dates',
    );
    assert(
      d.updated_date >= d.published_date,
      'Updated date before publication',
    );
    const route = d.locale + '/' + d.category + '/' + d.type + '/' + d.slug;
    assert(!routes.has(route), 'Duplicate route');
    routes.add(route);
    const key = d.locale + '/' + d.translation_key;
    assert(!translations.has(key), 'Duplicate translation key');
    translations.add(key);
    all.push({ ...d, body: content, html: markdown.render(content) });
  }
const productFiles = fs
  .readdirSync('data/products')
  .filter((f) => f.endsWith('.json'));
for (const file of productFiles) {
  const p = JSON.parse(
    fs.readFileSync(path.join('data/products', file), 'utf8'),
  );
  assert(slug.test(p.id) && slug.test(p.category), 'Invalid product identity');
  assert(
    url(p.official_url) && (!p.affiliate_url || url(p.affiliate_url)),
    'Invalid product links',
  );
  assert(
    ['pending', 'verifying', 'approved', 'not_prioritized'].includes(
      p.affiliate_status,
    ),
    'Invalid affiliate status',
  );
  for (const key of [
    'hardware_price',
    'monthly_subscription',
    'annual_subscription',
    'free_months',
    'iphone',
    'android',
    'battery_min',
    'battery_max',
  ]) {
    const f = p[key];
    assert(
      f &&
        url(f.source_url) &&
        (!f.verified_date || date.test(f.verified_date)),
      'Invalid sourced field ' + key,
    );
    assert(
      key === 'iphone' || key === 'android'
        ? typeof f.value === 'boolean'
        : (key === 'battery_min' && f.value === null) ||
            (typeof f.value === 'number' && f.value >= 0),
      'Invalid product value ' + key,
    );
  }
}
fs.writeFileSync(
  'data/content.generated.json',
  JSON.stringify(all, null, 2) + '\n',
);
fs.writeFileSync(
  'data/products.generated.json',
  JSON.stringify(
    productFiles.map((file) =>
      JSON.parse(fs.readFileSync(path.join('data/products', file), 'utf8')),
    ),
    null,
    2,
  ) + '\n',
);
console.log(
  'Validated ' +
    all.length +
    ' articles and ' +
    productFiles.length +
    ' product records.',
);

