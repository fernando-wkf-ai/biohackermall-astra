import { Locale, pathFor, tx } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';
export function Shell({
  locale,
  path,
  alternate = true,
  alternatePath,
  children,
}: {
  locale: Locale;
  path: string;
  alternate?: boolean;
  alternatePath?: string;
  children: React.ReactNode;
}) {
  const zh = locale === 'zh-HK';
  return (
    <>
      <a className="skip-link" href="#main">
        {tx(locale, 'Skip to content', '跳至主要內容')}
      </a>
      <header className="site-header">
        <a className="brand" href={pathFor(locale)}>
          Biohacker<span>Mall</span>
          <i />
        </a>
        <nav aria-label={tx(locale, 'Main navigation', '主要導覽')}>
          <a
            href={pathFor(locale, 'smartring')}
            aria-current={path.startsWith('smartring') ? 'page' : undefined}
          >
            {tx(locale, 'Smart rings', '智能戒指')}
          </a>
          <a href={pathFor(locale, 'about')}>
            {tx(locale, 'Our approach', '我們的理念')}
          </a>
        </nav>
        <div className="header-tools">
          {alternate && (
            <a
              className="language-link"
              href={pathFor(zh ? 'en' : 'zh-HK', alternatePath ?? path)}
              hrefLang={zh ? 'en' : 'zh-HK'}
              lang={zh ? 'en' : 'zh-HK'}
            >
              {zh ? 'English' : '繁體中文'} ↗
            </a>
          )}
          <ThemeToggle zh={zh} />
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div>
          <a className="brand" href={pathFor(locale)}>
            Biohacker<span>Mall</span>
            <i />
          </a>
          <p>
            {tx(
              locale,
              'Product intelligence. Personal decisions.',
              '產品情報，助你自主決策。',
            )}
          </p>
        </div>
        <div className="footer-links">
          <a href={pathFor(locale, 'smartring')}>
            {tx(locale, 'Smart rings', '智能戒指')}
          </a>
          <a href={pathFor(locale, 'about')}>
            {tx(locale, 'About', '關於我們')}
          </a>
          <a href={pathFor(locale, 'affiliate-disclosure')}>
            {tx(locale, 'Affiliate disclosure', '聯盟連結披露')}
          </a>
        </div>
        <p className="footer-note">
          {tx(
            locale,
            'Some merchant links may earn us a commission. This does not change our cost calculations.',
            '部分商戶連結可能為我們帶來佣金，但不會影響成本計算。',
          )}
        </p>
      </footer>
    </>
  );
}
export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { label: string; path?: string }[];
}) {
  return (
    <nav
      className="breadcrumbs"
      aria-label={tx(locale, 'Breadcrumb', '麵包屑導覽')}
    >
      <a href={pathFor(locale)}>{tx(locale, 'Home', '首頁')}</a>
      {items.map((x, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
          {x.path ? (
            <a href={pathFor(locale, x.path)}>{x.label}</a>
          ) : (
            <span aria-current="page">{x.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function Disclosure({ locale }: { locale: Locale }) {
  return (
    <p className="disclosure">
      {tx(
        locale,
        'Independent calculations. Some merchant links may earn a commission.',
        '計算結果保持獨立。部分商戶連結可能產生佣金。',
      )}{' '}
      <a href={pathFor(locale, 'affiliate-disclosure')}>
        {tx(locale, 'How we are funded ↗', '了解我們的收入來源 ↗')}
      </a>
    </p>
  );
}

