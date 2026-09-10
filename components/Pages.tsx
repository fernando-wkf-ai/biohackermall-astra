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
import SmartRingJourney from './SmartRingJourney';
export function HomePage({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const preview = compare(3, 'best', 'iphone');
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">
            ● {t('INDEPENDENT PRODUCT INTELLIGENCE', '獨立產品情報')}
          </p>
          <h1>
            {t('Better data.', '更清晰的數據。')}
            <br />
            {t('Smarter decisions.', '更明智的選擇。')}
            <br />
            <em>{t('Your biology.', '為你的身體而選。')}</em>
          </h1>
          <p className="lede">
            {t(
              'Understand the products behind better sleep, recovery and everyday performance. Clear comparisons. Transparent costs. Decisions on your terms.',
              '了解與睡眠、恢復及日常表現相關的產品。以清晰比較及透明成本，作出屬於自己的選擇。',
            )}
          </p>
          <a
            className="button primary"
            href={pathFor(locale, 'smartring/cost-calculator')}
          >
            {t('Explore smart ring costs', '探索智能戒指成本')} ↗
          </a>
          <p className="micro">
            {t(
              'Our first decision toolkit. Built for what comes next.',
              '首個產品決策工具系列，為未來更多類別奠定基礎。',
            )}
          </p>
        </div>
        <div className="hero-panel">
          <div className="panel-top">
            <span>{t('DECISION TOOLS / 001', '決策工具 / 001')}</span>
            <span className="chip">{t('SMART RINGS', '智能戒指')}</span>
          </div>
          <h2>
            {t('The price tag is', '標價，')}
            <br />
            {t('only the beginning.', '只是開始。')}
          </h2>
          <p>
            {t(
              '3-year ownership · iPhone · best-value billing',
              '3 年持有期 · iPhone · 自動選擇較低成本',
            )}
          </p>
          <div className="home-costs">
            {preview
              .filter((r) => r.compatible)
              .map((r) => (
                <div key={r.id}>
                  <div>
                    <span>{r.product.brand}</span>
                    <strong>{money(r.total)}</strong>
                  </div>
                  <div className="cost-bar" aria-hidden="true">
                    <span style={{ width: (r.hardware / 700) * 100 + '%' }} />
                    <i style={{ width: (r.subscription / 700) * 100 + '%' }} />
                  </div>
                </div>
              ))}
          </div>
          <div className="chart-legend">
            <span>
              <i />
              {t('Hardware', '硬件')}
            </span>
            <span>
              <i />
              {t('Membership', '會員費')}
            </span>
          </div>
          <div className="panel-bottom">
            <span>
              {t('One purchase.', '一次購買。')}
              <br />
              <strong>{t('Years of ownership.', '多年持有。')}</strong>
            </span>
            <a
              className="circle-link"
              href={pathFor(locale, 'smartring/cost-calculator')}
              aria-label={t('Open cost calculator', '開啟成本計算機')}
            >
              ↗
            </a>
          </div>
          <p className="micro">
            {t(
              'Starting data · pending full verification',
              '起始數據 · 待完整核實',
            )}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t('THE PLATFORM', '平台理念')}</p>
            <h2>
              {t(
                'Decide with a clearer picture.',
                '看得更清楚，選得更有把握。',
              )}
            </h2>
          </div>
          <span className="muted">
            {t('Products. Evidence. Perspective.', '產品、證據與觀點。')}
          </span>
        </div>
        <div className="three-grid">
          {[
            [
              t('01 / COMPARE', '01 / 比較'),
              t('Understand the trade-offs', '了解不同取捨'),
              t(
                'Hardware, subscriptions, compatibility and battery life, together in one view.',
                '硬件、訂閱、相容性及電池續航，一目了然。',
              ),
            ],
            [
              t('02 / CALCULATE', '02 / 計算'),
              t('Look beyond the price tag', '不止看標價'),
              t(
                'Choose your phone and ownership period. See what changes over time.',
                '選擇手機及持有年期，了解成本隨時間如何改變。',
              ),
            ],
            [
              t('03 / VERIFY', '03 / 核實'),
              t('Follow the source', '追溯資料來源'),
              t(
                'Clear assumptions, official references and visible verification status.',
                '清楚展示假設、官方參考資料及核實狀態。',
              ),
            ],
          ].map((x) => (
            <article className="feature-card" key={x[0]}>
              <span className="index">{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section category-section">
        <div>
          <p className="eyebrow">
            {t('EXPLORE THE FIRST VERTICAL', '探索首個產品類別')}
          </p>
          <h2>
            {t('Small device.', '小巧裝置。')}
            <br />
            {t('A considered decision.', '值得深思的選擇。')}
          </h2>
          <p>
            {t(
              'Smart rings are our starting point. BiohackerMall is built to help you navigate a wider world of biohacking products.',
              '智能戒指是我們的起點。BiohackerMall 將協助你了解更廣闊的生物黑客產品世界。',
            )}
          </p>
        </div>
        <a className="category-card" href={pathFor(locale, 'smartring')}>
          <span className="index">
            {t('01 / AVAILABLE NOW', '01 / 現已推出')}
          </span>
          <h3>
            {t('Smart rings', '智能戒指')} <span>↗</span>
          </h3>
          <p>
            {t(
              'Compare ' +
                products.length +
                ' products. Explore ownership costs, subscriptions and phone compatibility.',
              '比較 ' +
                products.length +
                ' 款產品，了解持有成本、訂閱及手機相容性。',
            )}
          </p>
          <div className="chip-row">
            {products.map((p) => (
              <span className="chip" key={p.id}>
                {p.brand}
              </span>
            ))}
          </div>
        </a>
      </section>
      <Disclosure locale={locale} />
    </>
  );
}
export function HubPage({ locale }: { locale: Locale }) {
  return <SmartRingJourney locale={locale} />;
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
      <p className="data-notice compact">
        {t(
          'Baseline estimates using supplied product data. Full fact verification is pending; see sources below.',
          '以提供的產品數據估算基本成本。完整資料核實尚待完成，來源見下方。',
        )}
      </p>
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

