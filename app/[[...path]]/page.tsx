import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/Shell';
import {
  HomePage,
  HubPage,
  CalculatorPage,
  AboutPage,
  DisclosurePage,
  ArticlePage,
} from '@/components/Pages';
import { articles, articlePath } from '@/lib/content';
import { origin, pages, pathFor, type Locale } from '@/lib/i18n';
export type Props = { params: Promise<{ path?: string[] }> };
function resolve(parts: string[] = []) {
  const locale: Locale = parts[0] === 'zh-hk' ? 'zh-HK' : 'en';
  const path = (locale === 'zh-HK' ? parts.slice(1) : parts).join('/');
  const article = articles.find(
    (a) => a.locale === locale && articlePath(a) === path,
  );
  const other = article
    ? articles.find(
        (a) =>
          a.locale !== locale && a.translation_key === article.translation_key,
      )
    : undefined;
  return { locale, path, article, other };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path, article, other } = resolve((await params).path);
  const entry = pages[path]?.[locale];
  if (!entry && !article)
    return {
      title: 'Page not found | BiohackerMall',
      robots: { index: false, follow: false },
    };
  const title = article?.seo_title ?? entry[0];
  const description = article?.meta_description ?? entry[1];
  const canonical = origin + pathFor(locale, path);
  const languages = article
    ? Object.fromEntries([
        [locale, canonical],
        ...(other
          ? [[other.locale, origin + pathFor(other.locale, articlePath(other))]]
          : []),
      ])
    : {
        en: origin + pathFor('en', path),
        'zh-HK': origin + pathFor('zh-HK', path),
        'x-default': origin + pathFor('en', path),
      };
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'BiohackerMall',
      type: article ? 'article' : 'website',
      locale: locale === 'en' ? 'en_US' : 'zh_HK',
      ...(article
        ? {
            publishedTime: article.published_date,
            modifiedTime: article.updated_date,
            authors: [article.author],
          }
        : {}),
    },
    twitter: { card: 'summary', title, description },
  };
}
export default async function Page({ params }: Props) {
  const { locale, path, article, other } = resolve((await params).path);
  if (!pages[path] && !article) notFound();
  let body;
  if (article) body = <ArticlePage locale={locale} article={article} />;
  else if (path === '') body = <HomePage locale={locale} />;
  else if (path === 'smartring') body = <HubPage locale={locale} />;
  else if (path === 'smartring/cost-calculator')
    body = <CalculatorPage locale={locale} />;
  else if (path === 'about') body = <AboutPage locale={locale} />;
  else body = <DisclosurePage locale={locale} />;
  const url = origin + pathFor(locale, path);
  const title = article?.title ?? pages[path]?.[locale][0];
  const schema: any[] = [];
  if (path === '')
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'BiohackerMall',
      url: origin + '/',
      inLanguage: ['en', 'zh-HK'],
    });
  if (path)
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'en' ? 'Home' : '首頁',
          item: origin + pathFor(locale),
        },
        ...(path.startsWith('smartring/')
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: locale === 'en' ? 'Smart rings' : '智能戒指',
                item: origin + pathFor(locale, 'smartring'),
              },
            ]
          : []),
        {
          '@type': 'ListItem',
          position: path.startsWith('smartring/') ? 3 : 2,
          name: title,
          item: url,
        },
      ],
    });
  if (article)
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.published_date,
      dateModified: article.updated_date,
      author: { '@type': 'Organization', name: article.author },
      publisher: { '@type': 'Organization', name: 'BiohackerMall' },
      inLanguage: locale,
      mainEntityOfPage: url,
      citation: article.sources.map((s) => s.url),
    });
  if (path === 'smartring/cost-calculator')
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      url,
      inLanguage: locale,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web browser',
      isAccessibleForFree: true,
    });
  return (
    <Shell
      locale={locale}
      path={path}
      alternate={!article || !!other}
      alternatePath={other ? articlePath(other) : undefined}
    >
      {body}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </Shell>
  );
}

