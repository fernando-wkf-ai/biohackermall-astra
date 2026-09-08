import { pages, pathFor, origin } from '@/lib/i18n';
import { articles, articlePath } from '@/lib/content';
export default function sitemap() {
  return [
    ...Object.keys(pages).flatMap((path) =>
      ['en', 'zh-HK'].map((locale) => ({
        url: origin + pathFor(locale as 'en' | 'zh-HK', path),
        alternates: {
          languages: {
            en: origin + pathFor('en', path),
            'zh-HK': origin + pathFor('zh-HK', path),
          },
        },
      })),
    ),
    ...articles.map((a) => ({
      url: origin + pathFor(a.locale, articlePath(a)),
      lastModified: a.updated_date,
      alternates: {
        languages: Object.fromEntries(
          articles
            .filter((b) => b.translation_key === a.translation_key)
            .map((b) => [b.locale, origin + pathFor(b.locale, articlePath(b))]),
        ),
      },
    })),
  ];
}
