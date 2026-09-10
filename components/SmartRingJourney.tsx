/* oxlint-disable next/no-img-element -- Local WebP assets are pre-optimised with explicit dimensions; no runtime image service is required. */
import { Locale, pathFor, tx } from '@/lib/i18n';
import { products, battery, type Fact } from '@/lib/products';
import { articles, articlePath } from '@/lib/content';
import { Breadcrumbs, Disclosure } from './Shell';
import ProductFacts from './ProductFacts';
import SmartRingProducts, { FactState } from './SmartRingProducts';
import {
  DayNight,
  WatchCoexistence,
  Screenless,
  ChargingTimeline,
  RecoverySignals,
  FitCheck,
  OwnershipStory,
} from './SmartRingInteractions';
import './smartring-journey.css';

export default function SmartRingJourney({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  return (
    <div className="sr-journey">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t('Smart rings', '智能戒指') }]}
      />
      <section className="sr-hero">
        <div className="sr-hero-copy">
          <p className="sr-kicker">
            {t(
              'LESS ON YOUR WRIST. MORE ABOUT YOU.',
              '手腕少一點負擔，多一點了解自己。',
            )}
          </p>
          <h1>
            {t('Why wear a', '為甚麼要戴')}
            <br />
            <em>{t('Smart Ring?', '智能戒指？')}</em>
          </h1>
          <p className="sr-lede">
            {t(
              "Health tracking doesn't always need another screen on your wrist.",
              '追蹤健康，不一定要在手腕上多加一個螢幕。',
            )}
          </p>
          <p>
            {t(
              'A small, screenless wearable that quietly collects signals about sleep and recovery. Wear it through your life. Make sense of the patterns later.',
              '小巧、沒有螢幕的穿戴裝置，靜靜收集睡眠與恢復相關訊號。融入日常生活，再按自己的步調了解身體趨勢。',
            )}
          </p>
          <div className="sr-actions">
            <a className="button primary" href="#fit">
              {t(
                'See if a Smart Ring fits your life',
                '看看智能戒指是否適合你',
              )}{' '}
              <span>↘</span>
            </a>
            <a href="#choose">
              {t(
                'Already decided? Compare Smart Rings',
                '已決定購買？比較智能戒指',
              )}{' '}
              ↗
            </a>
          </div>
        </div>
        <div className="sr-hero-visual">
          <img
            className="sr-hero-photo"
            src="/smartring-media/watch-ring-hero.webp"
            width="800"
            height="674"
            fetchPriority="high"
            alt={t(
              'Lifestyle illustration of a traditional watch and a plain ring worn together',
              '傳統手錶與素色戒指同時佩戴的生活概念示意圖',
            )}
          />
          <div className="sr-hero-statement">
            <span>
              {t('A DIFFERENT WEARABLE SPACE', '穿戴裝置的另一個位置')}
            </span>
            <h2>
              {t('Keep your watch.', '留住你的愛錶。')}
              <br />
              <em>{t('Add a new perspective.', '多一個了解自己的角度。')}</em>
            </h2>
          </div>
          <div className="sr-hero-caption">
            {t(
              'ILLUSTRATIVE LIFESTYLE CONCEPT · NOT A PRODUCT RENDER',
              '生活概念示意圖 · 並非產品展示圖',
            )}
          </div>
        </div>
      </section>
      <nav
        className="sr-chapters"
        aria-label={t('Your Smart Ring journey', '你的智能戒指旅程')}
      >
        <a href="#stories">01 {t('Why a ring', '為何選戒指')}</a>
        <a href="#fit">02 {t('Your fit', '適合你嗎')}</a>
        <a href="#choose">03 {t('Your options', '產品選擇')}</a>
        <a href="#evidence">04 {t('The evidence', '資料依據')}</a>
      </nav>

      <section
        className="sr-section sr-story-grid"
        id="stories"
        data-story="day-to-night"
      >
        <div className="sr-story-copy">
          <p className="sr-kicker">
            {t('01 / THE NIGHT-TIME SWITCH', '01 / 從日間，轉到夜間')}
          </p>
          <h2>
            {t('Want the sleep data.', '想要睡眠數據，')}
            <br />
            <em>{t('Not the watch in bed?', '卻不想戴着手錶睡覺？')}</em>
          </h2>
          <p className="sr-lede">
            {t(
              'Your smartwatch can own the day. A ring can quietly track the night.',
              '日間，交給智能手錶；晚上，讓戒指靜靜記錄。',
            )}
          </p>
          <p>
            {t(
              'You may love your Garmin, Apple Watch or Galaxy Watch for workouts, GPS and notifications. But turning in bed, sharing a bed or moving your arms can make a larger case and strap feel less welcome.',
              '你可能很喜歡 Garmin、Apple Watch 或 Galaxy Watch 的運動、GPS 及通知功能。但睡覺翻身、與伴侶同床，或移動手臂時，較大的錶殼和錶帶未必讓你自在。',
            )}
          </p>
          <p>
            {t(
              'A ring offers a smaller form factor on your finger. The useful question is whether that feels better for your nights.',
              '戒指把較小巧的穿戴裝置放在手指上。值得考慮的是：這種方式會否讓你的夜晚更舒服？',
            )}
          </p>
          <a className="sr-source" href="#fit">
            {t('Is this your reason for a ring?', '這是你考慮戒指的原因嗎？')} ↓
          </a>
        </div>
        <DayNight locale={locale} />
      </section>

      <section className="sr-section" data-story="keep-your-watch">
        <div className="sr-section-intro">
          <div>
            <p className="sr-kicker">
              {t('02 / KEEP WHAT YOU LOVE', '02 / 保留你的心頭好')}
            </p>
            <h2>
              {t("Health tracking doesn't", '追蹤健康，')}
              <br />
              <em>{t('have to replace your watch.', '不必取代你的愛錶。')}</em>
            </h2>
          </div>
          <p>
            {t(
              'You chose that mechanical, traditional or fashion watch for a reason. If health tracking interests you too, a ring can sit alongside it. Your wrist keeps its character.',
              '你選擇那隻機械錶、傳統手錶或時尚手錶，自有原因。如果你同時對健康追蹤感興趣，戒指可以與它並存，保留手腕上的個性。',
            )}
          </p>
        </div>
        <WatchCoexistence locale={locale} />
        <a className="sr-source" href="#screenless">
          {t('Explore screenless health tracking', '探索無螢幕健康追蹤')} ↓
        </a>
      </section>

      <section
        className="sr-section sr-story-grid"
        id="screenless"
        data-story="screenless"
      >
        <div className="sr-story-copy">
          <p className="sr-kicker">
            {t('03 / LESS TO RESPOND TO', '03 / 少一點需要回應的事情')}
          </p>
          <h2>
            {t('Track quietly.', '靜靜記錄，')}
            <br />
            <em>{t('Check when you want.', '想看時才看。')}</em>
          </h2>
          <p className="sr-lede">
            {t(
              'Screenless is a choice about your attention.',
              '沒有螢幕，是把注意力留給自己的選擇。',
            )}
          </p>
          <p>
            {t(
              'At dinner, at work, on a walk: passive tracking can happen without another display asking for a glance. Your phone app is there when you want the detail.',
              '晚餐、工作、散步時，被動追蹤可以在沒有另一個螢幕吸引目光的情況下進行。想看詳細資料時，再打開手機 App。',
            )}
          </p>
          <p>
            {t(
              'If you want on-wrist maps, messages or live workout metrics, keep those needs in mind. A ring occupies a different role.',
              '如果你想在手腕上看地圖、訊息或即時運動數據，選擇時應保留這些需要。戒指擔當的是另一種角色。',
            )}
          </p>
        </div>
        <Screenless locale={locale} />
      </section>

      <section className="sr-section" data-story="charging">
        <div className="sr-section-intro">
          <div>
            <p className="sr-kicker">
              {t('04 / THE HABIT THAT MATTERS', '04 / 重要的是戴得持續')}
            </p>
            <h2>
              {t('A wearable only records', '穿戴裝置，')}
              <br />
              <em>{t("while you're wearing it.", '要戴着才有記錄。')}</em>
            </h2>
          </div>
          <p>
            {t(
              'Longer intervals between charges can mean fewer interruptions to remember. That may make continuous wear easier. It still takes a charging routine that fits your life.',
              '兩次充電之間的時間較長，可能代表少一點需要記住的中斷，讓持續佩戴更容易。你仍需要找到適合自己的充電習慣。',
            )}
          </p>
        </div>
        <ChargingTimeline locale={locale} />
        <div className="sr-battery-grid">
          {products.map((p) => (
            <div key={p.id}>
              <span>
                {p.brand} {p.model}
              </span>
              <strong>{battery(p, locale === 'zh-HK')}</strong>
              {p.battery_alternative && (
                <p className="sr-fine">
                  {p.battery_alternative.minimum.value}–
                  {p.battery_alternative.maximum.value}{' '}
                  {t('days with vibration off', '天（關閉震動）')}
                </p>
              )}
              <FactState fact={p.battery_max} locale={locale} />
            </div>
          ))}
        </div>
        <p className="sr-fine">
          {t(
            'Battery ranges from the shared starting dataset; manufacturer-source verification remains pending where shown. Actual use, settings and size can change battery life. No generic smartwatch battery comparison is assumed.',
            '續航範圍來自共用起始資料，官方來源核實狀態如上所示。實際使用、設定及尺寸均可能影響續航；此處沒有假設一般智能手錶的續航數字。',
          )}
        </p>
      </section>

      <section className="sr-section sr-story-grid" data-story="recovery">
        <div className="sr-story-copy">
          <p className="sr-kicker">
            {t('05 / BEYOND THE WORKOUT', '05 / 不止是運動量')}
          </p>
          <h2>
            {t('You know what you did.', '你知道自己做了多少，')}
            <br />
            <em>{t('How did you recover?', '那麼，恢復得如何？')}</em>
          </h2>
          <p className="sr-lede">
            {t(
              'Activity tells you what you did. Recovery helps put it in context.',
              '活動告訴你做了甚麼，恢復資訊則提供更多背景。',
            )}
          </p>
          <p>
            {t(
              'After a busy day or a hard session, sleep and overnight signals can help you notice your own patterns. Look at trends alongside how you feel, rather than treating a single score as an instruction.',
              '忙碌一天或高強度訓練後，睡眠與夜間訊號可幫助你觀察自己的模式。把趨勢與實際感受一同考慮，不必把單一分數當作指令。',
            )}
          </p>
          <a className="sr-source" href="#evidence">
            {t('Understand the limits and sources', '了解限制與資料來源')} ↓
          </a>
        </div>
        <RecoverySignals locale={locale} />
      </section>

      <section className="sr-section sr-fit-layout" id="fit">
        <div>
          <p className="sr-kicker">
            {t('YOUR LIFE BEFORE THE PRODUCT', '先看生活，再選產品')}
          </p>
          <h2>
            {t('Does a ring', '智能戒指，')}
            <br />
            <em>{t('fit your life?', '適合你的生活嗎？')}</em>
          </h2>
          <p className="sr-lede">
            {t(
              'Seven questions. An honest answer.',
              '七個問題，一個坦誠答案。',
            )}
          </p>
          <p>
            {t(
              'A ring can be a useful addition. It can also be one more thing you don’t need. Start with what you actually want to change.',
              '戒指可以是實用的新裝備，也可以是多一件不需要的東西。先從你真正想改變的事情開始。',
            )}
          </p>
          <a className="sr-source" href="#choose">
            {t(
              'Skip the questions and compare rings',
              '跳過問答，直接比較戒指',
            )}{' '}
            ↓
          </a>
        </div>
        <FitCheck locale={locale} />
      </section>

      <section className="sr-section" id="choose">
        <div className="sr-section-intro">
          <div>
            <p className="sr-kicker">
              {t('FROM FIT TO A SHORTLIST', '由適合度，走到產品選擇')}
            </p>
            <h2>
              {t('Different rings.', '不同戒指，')}
              <br />
              <em>{t('Different trade-offs.', '各有取捨。')}</em>
            </h2>
          </div>
          <p>
            {t(
              'Choose around your phone, your willingness to pay a membership and your wear habits. Product order is fixed, independent of affiliate status.',
              '按你的手機、對會員費的接受程度及佩戴習慣選擇。產品排序固定，不受聯盟合作狀態影響。',
            )}
          </p>
        </div>
        <SmartRingProducts locale={locale} />
        <div className="sr-inline-disclosure">
          <p>
            {t(
              'Some links may earn us a commission. This does not influence qualification, product order or cost calculations. Official links are used where an active affiliate URL is not configured.',
              '部分連結可能為我們帶來佣金，但不影響適合度判斷、產品排序或成本計算。未設定有效聯盟網址時，使用官方連結。',
            )}
          </p>
          <a href={pathFor(locale, 'affiliate-disclosure')}>
            {t('How our links work', '了解連結披露')} ↗
          </a>
          <a href="#product-data">
            {t('Open detailed comparison', '查看詳細比較')} ↓
          </a>
        </div>
      </section>

      <section
        className="sr-section"
        id="ownership"
        data-story="ownership-cost"
      >
        <div className="sr-section-intro">
          <div>
            <p className="sr-kicker">
              {t('THE PRICE AFTER THE PRICE TAG', '標價以後，還有多少費用？')}
            </p>
            <h2>
              {t('One purchase.', '一次購買，')}
              <br />
              <em>{t('Years of ownership.', '多年持有。')}</em>
            </h2>
          </div>
          <p>
            {t(
              'Hardware is the starting point. A recurring membership adds cost over time; products without a mandatory membership keep that part of the cost at zero. Compare the same period, then decide what the service is worth to you.',
              '硬件費只是起點。持續會員費會隨時間累積；沒有必要會員費的產品，這部分成本維持為零。比較相同持有年期，再判斷服務對你的價值。',
            )}
          </p>
        </div>
        <OwnershipStory locale={locale} />
      </section>

      <section className="sr-section" id="evidence">
        <div className="sr-section-intro">
          <div>
            <p className="sr-kicker">
              {t('CONFIDENCE NEEDS EVIDENCE', '有依據，才有信心')}
            </p>
            <h2>
              {t('Follow the source.', '追溯來源，')}
              <br />
              <em>{t('Know what is checked.', '知道甚麼已核實。')}</em>
            </h2>
          </div>
          <p>
            {t(
              'A compelling story is the beginning. These records show where the numbers come from and which checks are still pending. We do not turn an unverified fact into a verified one because it looks good on a card.',
              '吸引人的故事只是開始。以下資料顯示數字出處，以及哪些核對仍未完成。資料不會因為放進產品卡，就變成已核實的事實。',
            )}
          </p>
        </div>
        <div className="sr-evidence-grid">
          {products.map((p) => (
            <details key={p.id} id={`evidence-${p.id}`}>
              <summary>
                {p.brand} {p.model}
                <span>{p.verified_date ?? t('Review pending', '待覆核')}</span>
              </summary>
              <p>{p.notes[locale]}</p>
              {(
                [
                  ['hardware_price', t('Hardware', '硬件')],
                  [
                    'monthly_subscription',
                    t('Monthly membership', '每月會員費'),
                  ],
                  ['annual_subscription', t('Annual membership', '每年會員費')],
                  ['free_months', t('Included months', '免費月份')],
                  ['iphone', 'iPhone'],
                  ['android', 'Android'],
                  ['battery_min', t('Minimum battery', '最短續航')],
                  ['battery_max', t('Maximum battery', '最長續航')],
                ] as const
              ).map(([key, label]) => (
                <p className="sr-evidence-fact" key={key}>
                  <span>{label}</span>
                  <FactState fact={p[key] as Fact<unknown>} locale={locale} />
                </p>
              ))}
              {p.battery_alternative && (
                <p>
                  {t('Alternative battery mode', '另一續航模式')}
                  <FactState
                    fact={p.battery_alternative.minimum}
                    locale={locale}
                  />
                  <FactState
                    fact={p.battery_alternative.maximum}
                    locale={locale}
                  />
                </p>
              )}
              <a className="sr-source" href={p.official_url}>
                {t('Official product page', '官方產品頁')} ↗
              </a>
            </details>
          ))}
        </div>
        <p className="sr-fine">
          {t(
            'Comfort is personal. Sensors, algorithms and supported signals differ by product. A ring does not replace medical care, live GPS or every smartwatch function. Check current regional terms before buying.',
            '舒適度因人而異。感測器、演算法及支援訊號因產品而異。戒指不能取代醫療服務、即時 GPS 或所有智能手錶功能。購買前請查看所在地區的最新條款。',
          )}
        </p>
      </section>
      <ProductFacts locale={locale} showImages />
      <section className="sr-section">
        <p className="sr-kicker">
          {t('A LITTLE MORE CONTEXT', '再了解多一點')}
        </p>
        <h2>{t('Read before you commit.', '決定前，再看清楚。')}</h2>
        <div className="three-grid">
          {articles
            .filter((a) => a.locale === locale && a.category === 'smartring')
            .map((a) => (
              <a
                className="feature-card article-card"
                href={pathFor(locale, articlePath(a))}
                key={a.slug}
              >
                <h3>{a.title} ↗</h3>
                <p>{a.excerpt}</p>
              </a>
            ))}
        </div>
      </section>
      <Disclosure locale={locale} />
    </div>
  );
}
