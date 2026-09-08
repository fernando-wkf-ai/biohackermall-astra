import manifest from '../data/content.generated.json';
import { Locale } from './i18n';
export type Article = {
  title: string;
  slug: string;
  translation_key: string;
  excerpt: string;
  body: string;
  html: string;
  category: string;
  type: string;
  tags: string[];
  author: string;
  published_date: string;
  updated_date: string;
  last_verified_date: string | null;
  locale: Locale;
  seo_title: string;
  meta_description: string;
  sources: { label: string; url: string }[];
  affiliate_disclosure: boolean;
  schema_type: 'Article';
  published: boolean;
};

export const articles = (manifest as Article[]).filter((a) => a.published);
export const articlePath = (a: Article) =>
  a.category + '/' + a.type + '/' + a.slug;
export const articleHTML = (a: Article) => a.html;
