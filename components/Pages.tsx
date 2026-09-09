import { Locale, pathFor, tx } from '@/lib/i18n';
import {
  articles,
  articleHTML,
  articlePath,
  type Article,
} from '@/lib/content';
import { products, money, compare } from '@/lib/products';
import { Breadcrumbs, Disclosure } from './Shell';
import ProductFacts from './ProductFacts';
import Calculator from './Calculator';
import VerificationNotice from './VerificationNotice';
export { default as HomePage } from './HomePage';
export function HubPage({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: t('Smart rings', '智能戒指') }]}
      />
      <section className="hub-hero">
        <div>
          <p className="eyebrow">
            {t('PRODUCT INTELLIGENCE / 001', '產品情報 / 001')}
          </p>
          <h1>
            {t('Smart rings.', '智能戒指。')}
            <br />
            <em>{t('Clearer choices.', '更清晰的選擇。')}</em>
          </h1>
          <p className="lede">
            {t(
              'Understand the ongoing cost, check your phone and compare the essentials. Start with the numbers that matter to your decision.',
              '了解持續費用、檢查手機支援，並比較重要規格。由與你的決策最相關的數字開始。',
            )}
          </p>
        </div>
        <a
          className="tool-card"
          href={pathFor(locale, 'smartring/cost-calculator')}
        >
          <div className="panel-top">
            <span>{t('INTERACTIVE TOOL', '互動工具')}</span>
            <span>↗</span>
          </div>
          <span className="tool-symbol" aria-hidden="true">
            ∑
          </span>
          <h2>{t('Total cost calculator', '總成本計算機')}</h2>
          <p>
            {t(
              'One to five years. Four rings. Every recurring fee in view.',
              '一至五年、四款戒指，清楚了解持續費用。',
            )}
          </p>
          <span className="button primary">
            {t('Calculate your costs', '計算你的成本')} ↗
          </span>
        </a>
      </section>
      <Disclosure locale={locale} />
      <ProductFacts locale={locale} />
      <section className="section" id="guides">
        <p className="eyebrow">
          {t('UNDERSTAND THE COMPARISON', '了解比較方法')}
        </p>
        <h2>
          {t('A little context goes a long way.', '多一點了解，選擇更有根據。')}
        </h2>
        <div className="three-grid">
          {articles
            .filter((a) => a.locale === locale && a.category === 'smartring')
            .map((a) => (
              <a
                className="feature-card article-card"
                href={pathFor(locale, articlePath(a))}
                key={a.slug}
              >
                <span className="index">{t('EXPLAINER', '解說文章')}</span>
                <h3>{a.title} ↗</h3>
                <p>{a.excerpt}</p>
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
export function CalculatorPage({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t('Smart rings', '智能戒指'), path: 'smartring' },
          { label: t('Cost calculator', '成本計算機') },
        ]}
      />
      <div className="tool-heading">
        <div>
          <p className="eyebrow">
            {t('SMART RING DECISION TOOLS', '智能戒指決策工具')}
          </p>
          <h1>
            {t('What will your ring', '你的戒指')}
            <br />
            <em>{t('really cost?', '實際要花多少？')}</em>
          </h1>
          <p>
            {t(
              'Compare hardware + membership over your ownership period.',
              '比較持有期間的硬件及會員費用。',
            )}
          </p>
        </div>
        <span className="chip">
          {t('4 PRODUCTS · USD ESTIMATES', '4 款產品 · 美元估算')}
        </span>
      </div>
      <p className="data-notice compact"><VerificationNotice locale={locale}/></p>
      <Calculator locale={locale} />
      <Disclosure locale={locale} />
      <ProductFacts locale={locale} />
    </>
  );
}
export function AboutPage({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: t('About', '關於我們') }]}
      />
      <article className="prose-page">
        <p className="eyebrow">
          {t('ABOUT BIOHACKERMALL', '關於 BIOHACKERMALL')}
        </p>
        <h1>
          {t('Clarity before', '先了解清楚，')}
          <br />
          <em>{t('commitment.', '再作出選擇。')}</em>
        </h1>
        <p className="lede">
          {t(
            'BiohackerMall is a product intelligence and decision-tools platform for people exploring biohacking products.',
            'BiohackerMall 是一個產品情報及決策工具平台，為探索生物黑客產品的人提供支援。',
          )}
        </p>
        <h2>{t('Understand, compare, choose', '了解、比較、選擇')}</h2>
        <p>
          {t(
            'Our tools make product trade-offs easier to understand through structured data, visible assumptions and useful comparisons. Smart rings are our first vertical; the platform is designed to accommodate more categories over time.',
            '我們以結構化數據、清晰假設及實用比較，讓產品之間的取捨更容易理解。智能戒指是首個類別，平台亦為日後加入更多產品類別做好準備。',
          )}
        </p>
        <h2>{t('Transparent by design', '以透明為設計原則')}</h2>
        <p>
          {t(
            'We show official source references and verification status. Starting data and incomplete checks are labelled. Product availability, prices and terms can change, so check the merchant before purchasing.',
            '我們展示官方來源及核實狀態，並標示起始數據及尚未完成的核對。供應、價格及條款可能改變，購買前請向商戶確認。',
          )}
        </p>
        <h2>{t('Your priorities come first', '以你的需要為先')}</h2>
        <p>
          {t(
            'The calculator identifies the lowest cost compatible option. It does not declare a universally best product, score health outcomes or favour a product because it has an affiliate programme.',
            '計算機指出相容產品中的最低成本選項，不會宣稱任何產品適合所有人，也不會評分健康成效，或因聯盟計劃而偏向某款產品。',
          )}
        </p>
        <h2>{t('How the platform is supported', '平台如何獲得支持')}</h2>
        <p>
          {t(
            'Some merchant links may earn affiliate commissions. These relationships are separate from product data and calculation logic.',
            '部分商戶連結可能帶來聯盟佣金。這些合作關係與產品數據及計算邏輯分開處理。',
          )}
        </p>
        <a className="text-link" href={pathFor(locale, 'affiliate-disclosure')}>
          {t('Read the affiliate disclosure ↗', '閱讀聯盟連結披露 ↗')}
        </a>
      </article>
    </>
  );
}
export function DisclosurePage({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: t('Affiliate disclosure', '聯盟連結披露') }]}
      />
      <article className="prose-page">
        <p className="eyebrow">{t('TRANSPARENCY', '透明原則')}</p>
        <h1>
          {t('How merchant', '商戶連結')}
          <br />
          <em>{t('links work.', '如何運作。')}</em>
        </h1>
        <p className="lede">
          {t(
            'BiohackerMall may earn a commission when you follow an affiliate link and make a qualifying purchase.',
            '當你透過聯盟連結進行符合資格的購買時，BiohackerMall 可能獲得佣金。',
          )}
        </p>
        <h2>
          {t(
            'Commercial links are separate from the comparison',
            '商業連結與比較分開處理',
          )}
        </h2>
        <p>
          {t(
            'Affiliate availability does not affect the ownership cost calculation, compatibility warnings or the lowest-cost label. A product without an affiliate link can still appear and link to its official website.',
            '有沒有聯盟連結，不會影響持有成本計算、相容性警告或最低成本標示。沒有聯盟連結的產品仍可顯示，並連至官方網站。',
          )}
        </p>
        <h2>{t('Current programme status', '目前計劃狀態')}</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.brand}:</strong>{' '}
              {product.affiliate_status === 'approved'
                ? t('Approved', '已獲批')
                : product.affiliate_status === 'pending'
                  ? t(
                      'Application submitted; approval pending',
                      '已提交申請，等待批准',
                    )
                  : product.affiliate_status === 'verifying'
                    ? t(
                        'Active affiliate route is being verified',
                        '正在核實有效的聯盟合作途徑',
                      )
                    : t(
                        'Not currently a priority monetization partner',
                        '目前並非優先商業合作對象',
                      )}
              {product.affiliate_network
                ? ' · ' + product.affiliate_network
                : ''}
              .
              {!product.affiliate_url &&
                ' ' + t('No affiliate link configured.', '尚未設定聯盟連結。')}
            </li>
          ))}
        </ul>
        <p>
          {t(
            'Status comes from our shared product records and may change. Product buttons use official URLs when no affiliate link is configured. Affiliate links are marked as sponsored in the page markup.',
            '狀態來自共用產品資料，日後可能改變。未設定聯盟連結時，產品按鈕使用官方網址。聯盟連結會在頁面標記中識別為贊助連結。',
          )}
        </p>
        <h2>{t('Check the merchant’s terms', '查看商戶條款')}</h2>
        <p>
          {t(
            'The merchant controls final prices, taxes, delivery, availability and purchase terms. Our calculator provides estimates with visible assumptions, not a guaranteed quotation.',
            '最終價格、稅項、運費、供應及購買條款由商戶決定。計算機提供附有明確假設的估算，並非保證報價。',
          )}
        </p>
      </article>
    </>
  );
}
export function ArticlePage({
  locale,
  article: a,
}: {
  locale: Locale;
  article: Article;
}) {
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tx(locale, 'Smart rings', '智能戒指'), path: a.category },
          { label: a.title },
        ]}
      />
      <article className="prose-page">
        <p className="eyebrow">
          {
            (
              {
                article: tx(locale, 'ARTICLE', '文章'),
                comparison: tx(locale, 'COMPARISON', '產品比較'),
                'buying-guide': tx(locale, 'BUYING GUIDE', '購買指南'),
                explainer: tx(locale, 'EXPLAINER', '解說文章'),
                'product-update': tx(locale, 'PRODUCT UPDATE', '產品更新'),
                'decision-guide': tx(locale, 'DECISION GUIDE', '決策指南'),
                news: tx(locale, 'UPDATE', '最新消息'),
              } as Record<string, string>
            )[a.type]
          }
          {' / '}
          {a.category === 'smartring'
            ? tx(locale, 'SMART RINGS', '智能戒指')
            : a.category}
        </p>
        <h1 className="article-title">{a.title}</h1>
        <p className="lede">{a.excerpt}</p>
        <div className="article-meta">
          {a.author}
          <br />
          {tx(locale, 'Published', '發布')} {a.published_date} ·{' '}
          {tx(locale, 'Updated', '更新')} {a.updated_date}
          <br />
          {tx(locale, 'Last verified', '最後核實')}：
          {a.last_verified_date ?? tx(locale, 'Pending review', '待覆核')}
        </div>
        {a.affiliate_disclosure && <Disclosure locale={locale} />}
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: articleHTML(a) }}
        />
        <h2>{tx(locale, 'Official sources', '官方來源')}</h2>
        <ul>
          {a.sources.map((s) => (
            <li key={s.url}>
              <a className="text-link" href={s.url}>
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <a
          className="button primary"
          href={pathFor(locale, 'smartring/cost-calculator')}
        >
          {tx(locale, 'Try the cost calculator', '使用成本計算機')} ↗
        </a>
      </article>
    </>
  );
}
