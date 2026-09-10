/* oxlint-disable next/no-img-element -- Local WebP assets are pre-optimised with explicit dimensions; no runtime image service is required. */
'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Watch,
  Moon,
  Sun,
  Circle,
  Activity,
  Bell,
  MessageSquare,
  Calendar,
  Smartphone,
  BatteryCharging,
  Check,
  ArrowRight,
  Heart,
  Thermometer,
  Waves,
} from 'lucide-react';
import { Locale, tx, pathFor } from '@/lib/i18n';
import { products, calculate, money } from '@/lib/products';
import { qualifyRing, type FitAnswer } from '@/lib/ring-fit';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function DayNight({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [night, setNight] = useState(false);
  return (
    <div className={`sr-daynight ${night ? 'is-night' : ''}`}>
      <div className="sr-stage-top">
        <span>{t('A DAY IN YOUR LIFE', '你的一天')}</span>
        <div
          className="sr-segment"
          aria-label={t('Choose time of day', '選擇日間或晚上')}
        >
          <button aria-pressed={!night} onClick={() => setNight(false)}>
            <Sun size={16} />
            {t('Day', '日間')}
          </button>
          <button aria-pressed={night} onClick={() => setNight(true)}>
            <Moon size={16} />
            {t('Night', '晚上')}
          </button>
        </div>
      </div>
      <div className="sr-clock">
        {night ? '23:00' : '08:00'}
        <span>
          {night
            ? t('Time to get comfortable.', '是時候，舒服地休息。')
            : t('Ready for your day.', '準備迎接新一天。')}
        </span>
      </div>
      <div className="sr-day-photos">
        <img
          src="/smartring-media/day-wear.webp"
          width="600"
          height="682"
          loading="lazy"
          alt={t(
            'Illustration: smartwatch on the wrist and plain ring on the finger during the day',
            '示意圖：日間手腕戴着智能手錶，手指戴着素色戒指',
          )}
          aria-hidden={night}
        />
        <img
          className="sr-night-photo"
          src="/smartring-media/night-remove.webp"
          width="600"
          height="682"
          loading="lazy"
          alt={t(
            'Illustration: taking the watch off at bedtime while the ring stays on the finger',
            '示意圖：睡前脫下手錶，戒指仍戴在手指上',
          )}
          aria-hidden={!night}
        />
        <div className="sr-photo-label">
          {night ? <Moon size={18} /> : <Sun size={18} />}
          <span>
            {night
              ? t('Watch off. Ring stays on.', '脫下手錶，戒指繼續佩戴。')
              : t('Your watch still owns the day.', '日間，仍然交給你的手錶。')}
          </span>
        </div>
      </div>
      <div className="sr-signal-strip" aria-hidden="true">
        {Array.from({ length: 42 }, (_, i) => (
          <i
            key={i}
            style={{
              height: `${12 + ((i * 17) % 35)}px`,
              animationDelay: `${i * 20}ms`,
            }}
          />
        ))}
      </div>
      <p className="sr-stage-message" aria-live="polite">
        {night
          ? t(
              'The watch moves to the bedside. Overnight sensing can continue on your finger.',
              '手錶放到床邊，手指上的戒指仍可繼續收集夜間訊號。',
            )
          : t(
              'Workouts. GPS. Notifications. Keep the smartwatch functions you value.',
              '運動、GPS、通知。保留你重視的智能手錶功能。',
            )}
      </p>
      <p className="sr-fine">
        {t(
          'Unbranded lifestyle illustration. No automatic data sharing is implied. Comfort and supported tracking vary.',
          '無品牌生活概念示意圖，並非裝置間自動共享資料。舒適度及支援功能因人與產品而異。',
        )}
      </p>
    </div>
  );
}

export function WatchCoexistence({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [step, setStep] = useState(0);
  const labels = [
    t('Keep your watch', '保留愛錶'),
    t('Add a ring', '加上戒指'),
    t('See your patterns', '了解身體趨勢'),
  ];
  return (
    <div className="sr-coexist">
      <div className={`sr-coexist-photo sr-coexist-step-${step}`}>
        <img
          src="/smartring-media/watch-ring.webp"
          width="1200"
          height="675"
          loading="lazy"
          alt={t(
            'Illustrative mechanical watch on a wrist alongside a plain ring on a finger',
            '示意圖片：手腕戴着機械錶，手指同時戴着素色戒指',
          )}
        />
        <img
          className="sr-finger-reveal"
          src="/smartring-media/watch-ring.webp"
          width="1200"
          height="675"
          loading="lazy"
          alt=""
          aria-hidden="true"
        />
        <div className={`sr-coexist-labels sr-step-${step}`}>
          <span>
            <Watch size={18} />
            {t('Your watch. Still yours.', '你的愛錶，一直都在。')}
          </span>
          {step >= 1 && (
            <span>
              <Circle size={18} />
              {t('A different wearable space.', '穿戴裝置的另一個位置。')}
            </span>
          )}
          {step >= 2 && (
            <span>
              <Activity size={18} />
              {t('Sleep → patterns → perspective', '睡眠 → 趨勢 → 了解自己')}
            </span>
          )}
        </div>
      </div>
      <div className="sr-steps">
        {labels.map((label, i) => (
          <button
            key={label}
            aria-pressed={step === i}
            onClick={() => setStep(i)}
          >
            <span>0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <p className="sr-fine" aria-live="polite">
        {labels[step]} ·{' '}
        {t(
          'Illustrative lifestyle image; not a branded product photograph.',
          '生活概念示意圖，並非品牌產品實拍。',
        )}
      </p>
    </div>
  );
}

export function Screenless({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [quiet, setQuiet] = useState(false);
  return (
    <div className={`sr-screenless ${quiet ? 'is-quiet' : ''}`}>
      <div className="sr-stage-top">
        <span>{t('CHOOSE YOUR ATTENTION', '把注意力留給自己')}</span>
        <button
          className="sr-toggle"
          aria-pressed={quiet}
          onClick={() => setQuiet(!quiet)}
        >
          {quiet
            ? t('Show smartwatch', '查看智能手錶')
            : t('Try screenless', '體驗無螢幕')}{' '}
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="sr-attention-stage">
        <div className="sr-notifications" aria-hidden={quiet}>
          <div>
            <MessageSquare />
            {t('A new message', '有新訊息')}
          </div>
          <div>
            <Bell />
            {t('Another notification', '又一個通知')}
          </div>
          <div>
            <Calendar />
            {t('A reminder to check', '提醒你查看')}
          </div>
        </div>
        <div className="sr-quiet-state" aria-hidden={!quiet}>
          <Circle size={76} strokeWidth={1.5} />
          <strong>
            {t('No display. No need to look.', '沒有螢幕，不必即時查看。')}
          </strong>
          <span>
            <Activity size={20} />
            {t('Passive sensing', '被動感測')} <ArrowRight size={16} />
            <Smartphone size={20} />
            {t('App, later', '稍後看 App')}
          </span>
        </div>
      </div>
      <p aria-live="polite">
        {quiet
          ? t(
              'The ring collects supported signals. You decide when to review them in the phone app.',
              '戒指收集支援的訊號，由你決定何時在手機 App 查看。',
            )
          : t(
              'A smartwatch can keep useful information within reach. Sometimes you want less to respond to.',
              '智能手錶讓實用資訊觸手可及，但有時你想少一點需要回應的事情。',
            )}
      </p>
      <p className="sr-fine">
        {t(
          'Illustration, not a claim that all rings have no alerts. Phone-app notifications remain configurable.',
          '此為概念示意，並非所有戒指都沒有提示功能。手機 App 通知可按設定調整。',
        )}
      </p>
    </div>
  );
}

export function ChargingTimeline({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [charging, setCharging] = useState(false);
  const [hasCharged, setHasCharged] = useState(false);
  return (
    <div className="sr-charging">
      <div className="sr-stage-top">
        <span>{t('A WEEK OF REAL LIFE', '日常生活的一週')}</span>
        <button
          className="sr-toggle"
          onClick={() => {
            setHasCharged(true);
            setCharging(!charging);
          }}
          aria-pressed={charging}
        >
          <BatteryCharging size={18} />
          {charging
            ? t('Put it back on', '重新戴上')
            : t('Take a charging break', '充電片刻')}
        </button>
      </div>
      <div className="sr-week">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className={i === 3 && charging ? 'sr-charge-gap' : ''}>
            <span>
              {t('Day', '第 ')} {i + 1}
              {locale === 'zh-HK' ? ' 天' : ''}
            </span>
            <div>
              {i === 3 && charging ? <BatteryCharging /> : <Activity />}
            </div>
            <small>
              {i === 3 && charging
                ? t('Off body', '暫時脫下')
                : t('Worn', '佩戴中')}
            </small>
          </div>
        ))}
      </div>
      <div className="sr-continuity">
        <span />
        <span />
        <span />
        <span className={charging ? 'gap' : hasCharged ? 'resumed' : ''} />
        <span />
        <span />
        <span />
      </div>
      <p aria-live="polite">
        {charging
          ? t(
              'While the ring charges off your body, that part of your story is not recorded. Put it back on to resume.',
              '戒指離身充電時，這段時間的身體訊號不會被記錄。重新戴上後繼續收集。',
            )
          : hasCharged
            ? t(
                'Back on your finger. Data collection resumes; the missed time cannot be filled in.',
                '重新戴在手指上，繼續收集資料；離身期間的空白無法補回。',
              )
            : t(
                'Wear it through your week. Try a charging break to see where data collection pauses.',
                '在日常生活中持續佩戴。試試充電片刻，看看記錄會在哪裏暫停。',
              )}
      </p>
      <p className="sr-fine">
        {t(
          'Illustrative timeline. Not a charging schedule, battery test or guarantee of gap-free data.',
          '示意時間軸，並非充電時間表、續航測試或無間斷資料保證。',
        )}
      </p>
    </div>
  );
}

export function RecoverySignals({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [selected, setSelected] = useState(0);
  const signals = [
    {
      icon: Moon,
      label: t('Sleep', '睡眠'),
      text: t(
        'Duration, timing and sleep patterns add context to how rested you feel.',
        '睡眠時長、時間與模式，為你的休息感受提供背景。',
      ),
    },
    {
      icon: Heart,
      label: t('Resting heart rate', '靜止心率'),
      text: t(
        'An overnight resting-heart-rate trend can be compared with your own usual pattern.',
        '夜間靜止心率趨勢，可與你平常的模式作比較。',
      ),
    },
    {
      icon: Waves,
      label: 'HRV',
      text: t(
        'Heart rate variability describes variation between heartbeats. Personal trends matter more than competing with someone else.',
        '心率變異度描述心跳間隔的變化。觀察自己的趨勢，比與別人比較更有意義。',
      ),
    },
    {
      icon: Thermometer,
      label: t('Temperature trends', '溫度趨勢'),
      text: t(
        'Supported devices can add temperature-related changes to the picture. Skin temperature is not a clinical core-temperature reading.',
        '支援的裝置可把溫度相關變化納入參考。皮膚溫度並非臨床核心體溫讀數。',
      ),
    },
  ];
  return (
    <div className="sr-recovery">
      <div className="sr-signal-buttons">
        {signals.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <s.icon size={22} />
            {s.label}
          </button>
        ))}
      </div>
      <div className="sr-recovery-flow" aria-hidden="true">
        <Activity />
        <span className="sr-flow-line" />
        <span>{t('YOUR BASELINE', '個人基準')}</span>
        <span className="sr-flow-line" />
        <Circle />
      </div>
      <div className="sr-signal-detail" key={selected} aria-live="polite">
        <h3>{signals[selected].label}</h3>
        <p>{signals[selected].text}</p>
      </div>
      <p className="sr-fine">
        {t(
          'Example: Oura’s documented readiness contributors. This is not a capability claim for every listed ring. Scores and sensing methods vary; these are wellness insights, not medical diagnoses.',
          '例子來自 Oura 公開的準備度指標，並不代表每款戒指均支援。評分及感測方法各有不同；資料用於日常健康參考，並非醫療診斷。',
        )}
      </p>
      <a
        className="sr-source"
        href="https://support.ouraring.com/hc/en-us/articles/360057791533-Readiness-Contributors"
      >
        {t('Evidence: Oura readiness contributors', '依據：Oura 準備度指標')} ↗
      </a>
    </div>
  );
}

export function FitCheck({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [answers, setAnswers] = useState<FitAnswer[]>([]);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (finished) heading.current?.focus();
  }, [finished]);
  const questions = [
    t('Do you dislike sleeping with a watch?', '你不喜歡戴着手錶睡覺嗎？'),
    t('Do you already own a smartwatch?', '你已經擁有智能手錶嗎？'),
    t(
      'Do you wear a traditional watch you don’t want to replace?',
      '你有一隻喜歡佩戴、不想被取代的傳統手錶嗎？',
    ),
    t(
      'Is understanding sleep and recovery important to you?',
      '了解睡眠與恢復，對你重要嗎？',
    ),
    t(
      'Do you want this device to offer a screen, messages or notifications?',
      '你希望這個裝置提供螢幕、訊息或通知嗎？',
    ),
    t(
      'Does passive tracking, with data checked later, appeal to you?',
      '被動記錄、稍後才查看資料，對你有吸引力嗎？',
    ),
    t(
      'Is reducing charging friction important to you?',
      '減少充電帶來的麻煩，對你重要嗎？',
    ),
  ];
  const move = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  };
  const result = finished ? qualifyRing(answers) : null;
  const outcomes = {
    ring: [
      t('A ring could earn its place.', '戒指或許值得在你生活中佔一席位。'),
      t(
        'You value passive sleep and recovery tracking, with a reason to move sensing off your wrist. Compare fit, compatibility and total cost before buying.',
        '你重視被動睡眠與恢復記錄，也有理由把感測裝置移離手腕。購買前，先比較佩戴感、相容性及總成本。',
      ),
    ],
    consider: [
      t('Worth exploring. No need to rush.', '值得了解，不用急着買。'),
      t(
        'Some benefits appeal to you, but the fit is not yet clear. Try a sizing kit and consider whether you will wear a ring consistently.',
        '部分好處對你有吸引力，但是否適合仍未明確。可先試尺寸套裝，想想自己會否持續佩戴。',
      ),
    ],
    watch: [
      t('A smartwatch may fit you better.', '智能手錶可能更適合你。'),
      t(
        'You want a screen or notifications. A ring does not replace those functions. Keep those needs at the centre of your decision.',
        '你想要螢幕或通知功能，戒指不能取代這些功能。選擇時，應以這些需要為先。',
      ),
    ],
    keep: [
      t('Your current setup may be enough.', '你現有的裝備可能已經足夠。'),
      t(
        'Your answers do not show a strong reason to add a ring right now. Keep what works; another device only helps if you want to wear it and use its insights.',
        '你的答案未顯示現時有強烈理由加買戒指。保留合用的裝備；只有你想戴、也會使用相關資訊，多一件裝置才有意義。',
      ),
    ],
  };
  return (
    <div className="sr-fit-box">
      <noscript>
        <p>
          {t(
            'Enable JavaScript for the fit check, or compare the product cards below.',
            '啟用 JavaScript 即可使用適合度問答，或直接查看下方產品卡。',
          )}
        </p>
      </noscript>
      {!finished ? (
        <>
          <div className="sr-fit-progress">
            <span>{t('YOUR LIFE, YOUR ANSWERS', '你的生活，由你決定')}</span>
            <span>{step + 1} / 7</span>
          </div>
          <progress
            value={step + 1}
            max={7}
            aria-label={t('Question progress', '問答進度')}
          />
          <h3 ref={heading} tabIndex={-1} id="sr-question">
            {questions[step]}
          </h3>
          <RadioGroup
            className="sr-answer-options"
            value={answers[step] ?? null}
            aria-labelledby="sr-question"
            onValueChange={(value) =>
              setAnswers((previous) => {
                const next = [...previous];
                next[step] = value as FitAnswer;
                return next;
              })
            }
          >
            {(['yes', 'no', 'unsure'] as const).map((v, i) => (
              <label key={v} className={answers[step] === v ? 'selected' : ''}>
                <RadioGroupItem value={v} />
                {[t('Yes', '是'), t('No', '否'), t('Not sure', '未確定')][i]}
                {answers[step] === v && <Check size={18} />}
              </label>
            ))}
          </RadioGroup>
          <div className="sr-fit-nav">
            <button disabled={step === 0} onClick={() => move(step - 1)}>
              {t('Back', '上一步')}
            </button>
            <button
              className="button primary"
              disabled={!answers[step]}
              onClick={() => (step === 6 ? setFinished(true) : move(step + 1))}
            >
              {step === 6
                ? t('See my result', '查看結果')
                : t('Next', '下一題')}{' '}
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="sr-fit-result" aria-live="polite">
          <p className="sr-kicker">{t('YOUR FIT CHECK', '你的適合度結果')}</p>
          <h3 ref={heading} tabIndex={-1}>{outcomes[result!][0]}</h3>
          <p>{outcomes[result!][1]}</p>
          <a
            className={`button ${result === 'ring' || result === 'consider' ? 'primary' : ''}`}
            href={
              result === 'ring' || result === 'consider'
                ? '#choose'
                : '#stories'
            }
          >
            {result === 'ring' || result === 'consider'
              ? t('Find a ring for my priorities', '按我的需要探索戒指')
              : t('Revisit the scenarios', '再看看生活情境')}{' '}
            ↓
          </a>
          <button
            className="sr-restart"
            onClick={() => {
              setFinished(false);
              move(0);
            }}
          >
            {t('Review my answers', '重新檢視答案')}
          </button>
        </div>
      )}
      <p className="sr-fine">
        {t(
          'A category-fit guide, not a health assessment. Answers stay on this page. Affiliate relationships are not part of the logic.',
          '這是產品類別適合度指南，並非健康評估。答案只留在此頁面；聯盟合作不參與判斷。',
        )}
      </p>
    </div>
  );
}

export function OwnershipStory({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [years, setYears] = useState(3);
  const max = Math.max(
    ...products.map((p) => calculate(p, 5, 'best', 'android').total),
  );
  return (
    <div className="sr-ownership">
      <div className="sr-stage-top">
        <span>{t('SAME PERIOD. SAME SCALE.', '相同年期，相同比例。')}</span>
        <div
          className="sr-segment"
          aria-label={t('Ownership years', '持有年期')}
        >
          {[1, 2, 3, 4, 5].map((y) => (
            <button
              key={y}
              aria-pressed={years === y}
              onClick={() => setYears(y)}
            >
              {y} {t('yr', '年')}
            </button>
          ))}
        </div>
      </div>
      <div className="sr-cost-legend">
        <span>
          <i />
          {t('Hardware', '硬件')}
        </span>
        <span>
          <i />
          {t('Membership', '會員費')}
        </span>
      </div>
      <div aria-live="polite">
        {products.map((p) => {
          const r = calculate(p, years, 'best', 'android');
          return (
            <div className="sr-cost-row" key={p.id}>
              <div>
                <span>
                  {p.brand} {p.model}
                </span>
                <strong>{money(r.total)}</strong>
              </div>
              <div className="sr-cost-track" aria-hidden="true">
                <span style={{ width: `${(r.hardware / max) * 100}%` }} />
                <i style={{ width: `${(r.subscription / max) * 100}%` }} />
              </div>
              <small>
                {r.subscription > 0
                  ? `${t('Hardware', '硬件')} ${money(r.hardware)} + ${t('membership', '會員費')} ${money(r.subscription)}`
                  : t(
                      'Hardware only · no mandatory membership in the current record',
                      '只有硬件費 · 現有資料沒有必要會員費',
                    )}
              </small>
            </div>
          );
        })}
      </div>
      <p className="sr-fine">
        {t(
          'USD baseline estimates, not live quotes. Best-value monthly or full annual billing, eligible included months applied. Excludes tax, delivery and optional extras. This view shows costs, not phone eligibility; check compatibility below and in the calculator.',
          '美元基本估算，並非即時報價。採用較低成本的月費或完整年費方案，計入合資格免費月份。不含稅項、運費及選購項目。此圖比較成本，不判斷手機相容性；請查看產品資料及計算機。',
        )}
      </p>
      <a
        className="button primary"
        href={pathFor(locale, 'smartring/cost-calculator')}
      >
        {t('Calculate your true ownership cost', '計算真正持有成本')} ↗
      </a>
    </div>
  );
}
