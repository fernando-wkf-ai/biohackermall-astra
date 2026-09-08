import fs from 'node:fs';
const text = (name, label = name) => ({ name, label, widget: 'string' });
const date = (name, required = true) => ({
  name,
  label: name.replaceAll('_', ' '),
  widget: 'datetime',
  format: 'YYYY-MM-DD',
  date_format: 'YYYY-MM-DD',
  time_format: false,
  required,
});
const source = {
  name: 'sources',
  label: 'Official sources',
  widget: 'list',
  fields: [text('label', 'Source name'), text('url', 'Official HTTPS URL')],
};
const articleFields = [
  text('title', 'Title'),
  text('slug', 'URL slug'),
  text('translation_key', 'Translation pair ID'),
  { ...text('excerpt', 'Short introduction'), widget: 'text' },
  text('category', 'Product category'),
  {
    name: 'type',
    label: 'Content type',
    widget: 'select',
    options: [
      'article',
      'comparison',
      'buying-guide',
      'explainer',
      'product-update',
      'decision-guide',
      'news',
    ],
  },
  { name: 'tags', widget: 'list' },
  text('author', 'Author'),
  date('published_date'),
  date('updated_date'),
  date('last_verified_date', false),
  { name: 'locale', widget: 'hidden' },
  text('seo_title', 'Search engine title'),
  { ...text('meta_description', 'Search engine description'), widget: 'text' },
  source,
  {
    name: 'affiliate_disclosure',
    label: 'Show affiliate disclosure',
    widget: 'boolean',
    default: true,
  },
  { name: 'schema_type', widget: 'hidden', default: 'Article' },
  {
    name: 'published',
    label: 'Published on site',
    widget: 'boolean',
    default: false,
  },
  { name: 'body', label: 'Article', widget: 'markdown' },
];
const sourced = (name, widget = 'number', required = true) => ({
  name,
  label: name.replaceAll('_', ' '),
  widget: 'object',
  fields: [
    {
      name: 'value',
      label: 'Value',
      widget,
      required,
      ...(widget === 'number' ? { value_type: 'float', min: 0 } : {}),
    },
    date('verified_date', false),
    text('source_url', 'Official source URL'),
  ],
});
const productFields = ['id', 'category', 'brand', 'model', 'currency']
  .map((x) => text(x))
  .concat(
    [
      'hardware_price',
      'monthly_subscription',
      'annual_subscription',
      'free_months',
    ].map((x) => sourced(x)),
    [
      sourced('iphone', 'boolean'),
      sourced('android', 'boolean'),
      sourced('battery_min', 'number', false),
      sourced('battery_max'),
      text('battery_mode'),
      {
        name: 'battery_alternative',
        label: 'Alternative battery mode',
        widget: 'object',
        required: false,
        fields: [text('mode'), sourced('minimum'), sourced('maximum')],
      },
      text('official_url', 'Official product URL'),
      { ...text('affiliate_url', 'Affiliate URL (optional)'), required: false },
      {
        name: 'affiliate_status',
        widget: 'select',
        options: ['pending', 'verifying', 'approved', 'not_prioritized'],
      },
      { ...text('affiliate_network'), required: false },
      date('verified_date', false),
      {
        name: 'data_status',
        widget: 'select',
        options: ['starting_dataset', 'verified'],
      },
      text('availability_status'),
      {
        name: 'notes',
        widget: 'object',
        fields: [
          { name: 'en', label: 'English note', widget: 'text' },
          { name: 'zh-HK', label: 'Traditional Chinese note', widget: 'text' },
        ],
      },
    ],
  );
const settings = JSON.parse(fs.readFileSync('cms-settings.json', 'utf8'));
const enabled = Boolean(settings.repository && settings.auth_origin);
const config = {
  backend: {
    name: 'github',
    repo: settings.repository || '',
    branch: 'main',
    base_url: settings.auth_origin || '',
    auth_endpoint: 'auth',
  },
  publish_mode: 'editorial_workflow',
  media_folder: 'public/uploads',
  public_folder: '/uploads',
  site_url: 'https://biohackermall.com',
  collections: [
    ...['en', 'zh-hk'].map((folder) => ({
      name: 'articles_' + folder,
      label: folder === 'en' ? 'English articles' : '繁體中文文章',
      folder: 'content/' + folder,
      create: true,
      format: 'frontmatter',
      extension: 'md',
      slug: '{{slug}}',
      summary: '{{title}}',
      fields: articleFields.map((f) =>
        f.name === 'locale'
          ? { ...f, default: folder === 'en' ? 'en' : 'zh-HK' }
          : f,
      ),
    })),
    {
      name: 'products',
      label: 'Shared product data / 共用產品資料',
      folder: 'data/products',
      create: true,
      format: 'json',
      extension: 'json',
      identifier_field: 'id',
      slug: '{{id}}',
      summary: '{{brand}} {{model}}',
      fields: productFields,
    },
  ],
};
fs.writeFileSync('public/admin/config.yml', JSON.stringify(config, null, 2));
fs.writeFileSync('public/admin/status.json', JSON.stringify({ enabled }));
console.log(
  'CMS forms generated. Authenticated publishing ' +
    (enabled ? 'configured' : 'pending account connection') +
    '.',
);

