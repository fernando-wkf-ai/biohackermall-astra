/* oxlint-disable next/no-img-element -- Local WebP assets are pre-optimised with explicit dimensions; no runtime image service is required. */
'use client';
import { useState } from 'react';
import {
  products,
  battery,
  money,
  type Fact,
  type Product,
  type Phone,
} from '@/lib/products';
import { Locale, tx } from '@/lib/i18n';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function FactState({
  fact,
  locale,
}: {
  fact: Fact<unknown>;
  locale: Locale;
}) {
  return (
    <small className="sr-fact-state">
      <a href={fact.source_url}>
        {fact.verified_date
          ? tx(locale, 'Verified ', '已核實 ') + fact.verified_date
          : tx(locale, 'Source · awaiting verification', '來源 · 待核實')}{' '}
        ↗
      </a>
    </small>
  );
}
export function BuyLink({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const affiliate =
    p.affiliate_status === 'approved' && Boolean(p.affiliate_url);
  return (
    <a
      className="button sr-buy"
      data-product={p.id}
      data-link-kind={affiliate ? 'affiliate' : 'official'}
      href={affiliate ? p.affiliate_url! : p.official_url}
      rel={affiliate ? 'sponsored noopener' : 'noopener'}
    >
      {tx(
        locale,
        affiliate ? 'Check current price' : 'View official buying options',
        affiliate ? '查看最新價格' : '查看官方購買選項',
      )}{' '}
      ↗
    </a>
  );
}
export default function SmartRingProducts({ locale }: { locale: Locale }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  const [phone, setPhone] = useState<Phone | null>(null);
  const [priority, setPriority] = useState('all');
  const [filtered, setFiltered] = useState(false);
  const profiles: Record<string, { fit: string; trade: string }> = {
    oura: {
      fit: t(
        'For people comfortable paying for an ongoing membership.',
        '適合接受持續支付會員費的人。',
      ),
      trade: t(
        'Full features require membership. Include that commitment in your decision.',
        '完整功能需要會員訂閱，選擇時應計入這項持續承擔。',
      ),
    },
    ringconn: {
      fit: t(
        'For people exploring longer wear intervals without a mandatory membership.',
        '適合想了解較長佩戴週期、又不想支付必要會員費的人。',
      ),
      trade: t(
        'Battery estimates depend on vibration settings; the mode matters.',
        '續航估算視乎震動設定，不能忽略所選模式。',
      ),
    },
    ultrahuman: {
      fit: t(
        'For people who prefer paying for hardware without a mandatory membership.',
        '適合偏好支付硬件費、沒有必要會員費的人。',
      ),
      trade: t(
        'A larger initial outlay in this dataset. Check regional shipping and availability.',
        '在現有資料中，初期支出較高。請確認所在地區的供應及配送。',
      ),
    },
    samsung: {
      fit: t(
        'For Android users, especially those already using a Galaxy phone.',
        '適合 Android 用家，尤其已使用 Galaxy 手機的人。',
      ),
      trade: t(
        'No iPhone support in the record; some features require a Galaxy phone.',
        '現有資料列為不支援 iPhone，部分功能需要 Galaxy 手機。',
      ),
    },
  };
  const matches = (p: Product) =>
    !filtered ||
    ((!phone || (phone === 'iphone' ? p.iphone.value : p.android.value)) &&
      (priority !== 'no-sub' ||
        (p.monthly_subscription.value === 0 &&
          p.annual_subscription.value === 0)));
  const count = products.filter(matches).length;
  return (
    <>
      <div className="sr-product-controls">
        <fieldset>
          <legend>{t('Your phone', '你的手機')}</legend>
          <RadioGroup
            className="sr-inline-options"
            value={phone}
            onValueChange={(v) => {
              setPhone(v as Phone);
              setFiltered(true);
            }}
          >
            {(['iphone', 'android', 'samsung'] as const).map((v, i) => (
              <label key={v}>
                <RadioGroupItem value={v} />
                {['iPhone', 'Android', 'Samsung Galaxy'][i]}
              </label>
            ))}
          </RadioGroup>
        </fieldset>
        <fieldset>
          <legend>{t('Membership preference', '會員費偏好')}</legend>
          <RadioGroup
            className="sr-inline-options"
            value={priority}
            onValueChange={(v) => {
              setPriority(v as string);
              setFiltered(true);
            }}
          >
            {['all', 'no-sub'].map((v, i) => (
              <label key={v}>
                <RadioGroupItem value={v} />
                {i
                  ? t('No mandatory membership', '沒有必要會員費')
                  : t('Open to either', '兩者均可')}
              </label>
            ))}
          </RadioGroup>
        </fieldset>
        {filtered && (
          <button
            className="sr-toggle"
            onClick={() => {
              setFiltered(false);
              setPriority('all');
              setPhone(null);
            }}
          >
            {t('Reset preferences', '重設偏好')}
          </button>
        )}
      </div>
      <output className="sr-filter-status">
        {filtered
          ? t(
              `${count} options match these preferences. All four remain visible; this is not a quality ranking.`,
              `${count} 款符合這些偏好。四款產品仍會顯示；這並非品質排名。`,
            )
          : t(
              'Four options, no universal winner. Set your phone and membership preference to narrow the choice.',
              '四款選擇，沒有一款適合所有人。設定手機與會員費偏好，縮窄選擇。',
            )}
      </output>
      <div className="sr-product-grid">
        {products.map((p) => (
          <article
            className={`sr-product-card ${filtered && !matches(p) ? 'sr-not-match' : ''}`}
            key={p.id}
            id={`ring-${p.id}`}
          >
            <div className="sr-product-picture">
              <img
                src={`/smartring-media/${p.id}.webp`}
                width="720"
                height="720"
                loading="lazy"
                decoding="async"
                alt={`${p.brand} ${p.model} — ${p.id === 'ultrahuman' ? t('Bionic Gold official product image', 'Bionic Gold 官方產品圖片') : p.id === 'samsung' ? t('Titanium Black ring, official image', 'Titanium Black 戒指官方圖片') : t('silver finish official product image', '銀色款官方產品圖片')}`}
              />
              <span>{t('OFFICIAL PRODUCT IMAGE', '官方產品圖片')}</span>
            </div>
            <div className="sr-product-body">
              <p className="sr-match-label">
                {filtered
                  ? matches(p)
                    ? t('Matches your preferences', '符合你的偏好')
                    : t('Outside your preferences', '不符合你的偏好')
                  : t('EXPLORE THE TRADE-OFF', '了解取捨')}
              </p>
              <h3>
                {p.brand} <br />
                {p.model}
              </h3>
              <p className="sr-who">{profiles[p.id].fit}</p>
              <div className="sr-product-price">
                <strong>{money(p.hardware_price.value)}</strong>
                <span>{t('USD hardware baseline', '美元硬件基本價格')}</span>
                <FactState fact={p.hardware_price} locale={locale} />
              </div>
              <dl>
                <div>
                  <dt>{t('Membership', '會員費')}</dt>
                  <dd>
                    {p.monthly_subscription.value > 0
                      ? `${money(p.monthly_subscription.value)}${t('/mo', '／月')} · ${money(p.annual_subscription.value)}${t('/yr', '／年')}`
                      : t('No mandatory subscription', '沒有必要訂閱')}
                    <FactState fact={p.monthly_subscription} locale={locale} />
                  </dd>
                </div>
                <div>
                  <dt>{t('Battery', '續航')}</dt>
                  <dd>
                    {battery(p, locale === 'zh-HK')}
                    <FactState fact={p.battery_max} locale={locale} />
                  </dd>
                </div>
                <div>
                  <dt>{t('Phone', '手機')}</dt>
                  <dd>
                    {[
                      p.iphone.value ? 'iPhone' : null,
                      p.android.value ? 'Android' : null,
                    ]
                      .filter(Boolean)
                      .join(' + ') || t('Check source', '查看來源')}
                    <FactState
                      fact={phone === 'iphone' ? p.iphone : p.android}
                      locale={locale}
                    />
                  </dd>
                </div>
              </dl>
              <p className="sr-trade">
                <strong>{t('The trade-off', '要考慮的取捨')}</strong>
                {profiles[p.id].trade}
              </p>
              <BuyLink product={p} locale={locale} />
              <a className="sr-source" href={`#evidence-${p.id}`}>
                {t('Check sources & verification', '查看來源及核實狀態')} ↓
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="sr-fine">
        {t(
          'Prices are starting-data estimates, not live offers. Check fit with a sizing kit, local availability, phone/software requirements and return terms before ordering. Images show a finish; prices may refer to a different finish.',
          '價格為起始資料估算，並非即時優惠。訂購前請以尺寸套裝確認佩戴感，並查看本地供應、手機及軟件要求，以及退貨條款。圖片展示的顏色款式，價格可能不同。',
        )}
      </p>
    </>
  );
}
