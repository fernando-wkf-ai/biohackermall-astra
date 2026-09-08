'use client';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  battery,
  compare,
  money,
  products,
  type Billing,
  type Phone,
} from '@/lib/products';
import { type Locale, tx } from '@/lib/i18n';
function Choices({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="control-group">
      <legend>{legend}</legend>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(String(v))}
        className="segmented"
        aria-label={legend}
      >
        {options.map(([v, label]) => (
          <div key={v} className={value === v ? 'choice active' : 'choice'}>
            <RadioGroupItem value={v} aria-label={label} />
            <span aria-hidden="true">{label}</span>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
export default function Calculator({ locale }: { locale: Locale }) {
  const zh = locale === 'zh-HK';
  const t = (en: string, cn: string) => tx(locale, en, cn);
  const [phone, setPhone] = useState<Phone>('iphone');
  const [years, setYears] = useState(3);
  const [billing, setBilling] = useState<Billing>('best');
  const rows = compare(years, billing, phone);
  const max = Math.max(...rows.map((r) => r.total));
  const cheapest = rows.find((r) => r.cheapest)!;
  useEffect(() => {
    const context = (document as any).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name: 'configure_smart_ring_comparison',
      title: 'Compare smart ring ownership costs',
      description:
        'Set phone, ownership years and Oura billing preference; update the visible comparison and return USD costs.',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', enum: ['iphone', 'android', 'samsung'] },
          years: { type: 'integer', minimum: 1, maximum: 5 },
          billing: { type: 'string', enum: ['monthly', 'annual', 'best'] },
        },
        required: ['phone', 'years', 'billing'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: any) {
        if (
          !input ||
          Object.keys(input).some(
            (k) => !['phone', 'years', 'billing'].includes(k),
          )
        )
          throw new Error('Invalid input');
        const result = compare(input.years, input.billing, input.phone);
        flushSync(() => {
          setPhone(input.phone);
          setYears(input.years);
          setBilling(input.billing);
        });
        return result.map(({ product, ...r }) => ({
          ...r,
          model: product.brand + ' ' + product.model,
          currency: 'USD',
        }));
      },
    };
    try {
      Promise.resolve(
        context.registerTool(tool, { signal: lifecycle.signal }),
      ).catch(() => {});
    } catch {}
    return () => lifecycle.abort();
  }, []);
  return (
    <>
      <div className="calculator-controls">
        <Choices
          legend={t('01 / Your phone', '01 / 你的手機')}
          value={phone}
          options={[
            ['iphone', 'iPhone'],
            ['android', 'Android'],
            ['samsung', 'Samsung Galaxy'],
          ]}
          onChange={(v) => setPhone(v as Phone)}
        />
        <Choices
          legend={t('02 / Ownership period', '02 / 持有年期')}
          value={String(years)}
          options={[1, 2, 3, 4, 5].map((v) => [
            String(v),
            v + ' ' + t(v === 1 ? 'year' : 'years', '年'),
          ])}
          onChange={(v) => setYears(Number(v))}
        />
        <Choices
          legend={t('03 / Oura billing', '03 / Oura 計費方式')}
          value={billing}
          options={[
            ['monthly', t('Monthly', '按月')],
            ['annual', t('Annual', '按年')],
            ['best', t('Best value', '自動選擇較低成本')],
          ]}
          onChange={(v) => setBilling(v as Billing)}
        />
      </div>
      <div className="results-top">
        <div>
          <h2>{t('Your ownership snapshot', '你的持有成本概覽')}</h2>
          <p>
            {years} {t(years === 1 ? 'year' : 'years', '年')}{' '}
            <span aria-hidden="true">·</span>{' '}
            {phone === 'iphone'
              ? 'iPhone'
              : phone === 'samsung'
                ? 'Samsung Galaxy'
                : 'Android'}{' '}
            <span aria-hidden="true">·</span> USD
          </p>
        </div>
        <span className="chip neutral">
          {t(
            'Cost comparison, not a product ranking',
            '成本比較，並非產品排名',
          )}
        </span>
      </div>
      <div
        className="summary-strip"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="status-mark">↘</span>
        <p>
          {t('Lowest cost compatible option:', '相容產品中的最低成本：')}{' '}
          <strong>
            {cheapest.product.brand} {cheapest.product.model}
          </strong>{' '}
          — <strong>{money(cheapest.total)}</strong> {t('over', '／')} {years}{' '}
          {t(years === 1 ? 'year.' : 'years.', '年。')}
        </p>
      </div>
      <div className="product-grid">
        {rows.map((r, i) => (
          <article
            className={
              'product-card ' +
              (r.cheapest ? 'lowest ' : '') +
              (!r.compatible ? 'incompatible' : '')
            }
            key={r.id}
          >
            <div className="product-top">
              <span className="index">0{i + 1}</span>
              <span className={'chip ' + (r.cheapest ? 'green' : '')}>
                {r.cheapest
                  ? t('Lowest compatible cost', '相容產品最低成本')
                  : r.product.monthly_subscription.value
                    ? t('Subscription for full features', '完整功能需訂閱')
                    : t('No mandatory subscription', '無強制訂閱')}
              </span>
            </div>
            <p className="product-brand">{r.product.brand}</p>
            <h3>{r.product.model}</h3>
            <div className="total-price">
              {money(r.total)}
              <span>
                USD / {years} {t(years === 1 ? 'year' : 'years', '年')}
              </span>
            </div>
            <div className="cost-bar" aria-hidden="true">
              <span style={{ width: (r.hardware / max) * 100 + '%' }} />
              <i style={{ width: (r.subscription / max) * 100 + '%' }} />
            </div>
            <dl className="cost-details">
              <div>
                <dt>{t('Hardware', '硬件')}</dt>
                <dd>{money(r.hardware)}</dd>
              </div>
              <div>
                <dt>{t('Subscription', '訂閱')}</dt>
                <dd>{money(r.subscription)}</dd>
              </div>
              <div>
                <dt>{t('Vs. lowest compatible', '相比相容產品最低成本')}</dt>
                <dd>
                  {r.difference >= 0 ? '+' : '−'}
                  {money(Math.abs(r.difference))}
                </dd>
              </div>
            </dl>
            <p
              className={
                r.compatible ? 'compatibility' : 'compatibility warning'
              }
            >
              {r.compatible ? '✓ ' : '⚠ '}
              {r.compatible
                ? t('Compatible with selected phone', '與所選手機相容')
                : t('Not compatible with iPhone', '不支援 iPhone')}
            </p>
            <p className="battery-label">
              {t('Battery estimate', '電池續航估算')}
              <br />
              <strong>{battery(r.product, zh)}</strong>
            </p>
            <p className="verified">
              {t('Last verified: ', '最後核實：')}
              {r.product.verified_date ??
                t('pending full review', '待完整覆核')}
            </p>
            <a
              className="product-link"
              href={r.product.affiliate_url ?? r.product.official_url}
              rel={r.product.affiliate_url ? 'sponsored noopener' : 'noopener'}
            >
              {r.product.affiliate_url
                ? t('Merchant website', '商戶網站')
                : t('Official website', '官方網站')}{' '}
              ↗
            </a>
          </article>
        ))}
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {t('THE NUMBERS, IN CONTEXT', '數據與背景')}
            </p>
            <h2>{t('A clear view of every cost.', '清楚了解每項成本。')}</h2>
          </div>
          <span className="muted">
            {t(
              'All four products stay in the comparison.',
              '比較中保留所有四款產品。',
            )}
          </span>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label={t(
            'Ownership cost table; scroll horizontally',
            '持有成本表；可橫向捲動',
          )}
        >
          <Table className="comparison-table">
            <TableCaption>
              {t(
                'USD estimates at supplied base prices, excluding tax, delivery, promotions and optional services.',
                '以提供的美元基本價格估算，不包括稅項、運費、優惠及選購服務。',
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                {[
                  t('Product', '產品'),
                  t('Hardware', '硬件'),
                  t('Subscription', '訂閱'),
                  t('Total', '總成本'),
                  t('Billing used', '採用計費方式'),
                  t('Phone', '手機'),
                ].map((h) => (
                  <TableHead key={h} scope="col">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableHead scope="row">
                    {r.product.brand} {r.product.model}
                  </TableHead>
                  <TableCell>{money(r.hardware)}</TableCell>
                  <TableCell>{money(r.subscription)}</TableCell>
                  <TableCell>
                    <strong>{money(r.total)}</strong>
                  </TableCell>
                  <TableCell>
                    {r.subscription === 0
                      ? t('None required', '無需訂閱')
                      : r.billing === 'monthly'
                        ? t('Monthly', '按月')
                        : t('Annual', '按年')}
                  </TableCell>
                  <TableCell className={!r.compatible ? 'warning' : ''}>
                    {r.compatible
                      ? t('Compatible', '相容')
                      : t('Incompatible', '不相容')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="explanations">
          <h3>{t('How these results are calculated', '計算方法')}</h3>
          {rows.map((r) => (
            <p key={r.id}>
              <strong>
                {r.product.brand} {r.product.model}:
              </strong>{' '}
              {r.subscription === 0
                ? t(
                    money(r.hardware) +
                      ' hardware + no mandatory subscription = ' +
                      money(r.total) +
                      ' over ' +
                      years +
                      (years === 1 ? ' year.' : ' years.'),
                    money(r.hardware) +
                      ' 硬件費用 + 無強制訂閱費 = ' +
                      years +
                      ' 年共 ' +
                      money(r.total) +
                      '。',
                  )
                : t(
                    money(r.hardware) +
                      ' hardware + ' +
                      (r.billing === 'monthly'
                        ? r.paidMonths +
                          ' paid months × ' +
                          money(r.product.monthly_subscription.value)
                        : r.annualCharges +
                          (r.annualCharges === 1
                            ? ' annual charge × '
                            : ' annual charges × ') +
                          money(r.product.annual_subscription.value)) +
                      ' = ' +
                      money(r.total) +
                      '.',
                    money(r.hardware) +
                      ' 硬件費用 + ' +
                      (r.billing === 'monthly'
                        ? r.paidMonths +
                          ' 個付費月 × ' +
                          money(r.product.monthly_subscription.value)
                        : r.annualCharges +
                          ' 次年費 × ' +
                          money(r.product.annual_subscription.value)) +
                      ' = ' +
                      money(r.total) +
                      '。',
                  )}{' '}
              {!r.compatible &&
                t(
                  'This product is incompatible with your selected phone.',
                  '此產品與你選擇的手機不相容。',
                )}
            </p>
          ))}
        </div>
      </section>
      <section className="methodology">
        <h2>{t('The assumptions behind the answer', '計算背後的假設')}</h2>
        <ul>
          <li>
            {t(
              'One ring purchase, constant base prices and continuous membership. Estimates exclude taxes, delivery, discounts and optional paid services. Battery life is not a promise of product lifespan.',
              '假設購買一枚戒指、基本價格不變及持續訂閱。估算不包括稅項、運費、折扣及選購付費服務。電池續航不代表產品使用壽命。',
            )}
          </li>
          <li>
            {t(
              'Oura assumes a new member eligible for the included ' +
                products[0].free_months.value +
                ' month. Existing members may not qualify. Monthly billing pays for the remaining months. Annual billing charges whole 12-month blocks after the free period, with no prorating or refund assumed.',
              'Oura 假設為符合資格的新會員，享有 ' +
                products[0].free_months.value +
                ' 個月免費期。現有會員未必符合資格。按月計費會計算餘下付費月份；按年計費則在免費期後收取完整 12 個月年費，不假設按比例收費或退款。',
            )}
          </li>
          <li>
            {t(
              'Best value compares an all-monthly plan with an all-annual plan and uses the cheaper total. It does not model switching between plans.',
              '自動選擇較低成本會比較全程按月及全程按年的總費用，不計算中途轉換方案。',
            )}
          </li>
          <li>
            {t(
              'Phone compatibility is a broad platform check. Check supported OS versions, region restrictions and feature requirements before purchasing.',
              '手機相容性只反映平台支援。購買前請查看作業系統版本、地區限制及個別功能要求。',
            )}
          </li>
        </ul>
        <a
          className="text-link"
          href={products[0].monthly_subscription.source_url}
        >
          {t('Oura official membership terms', 'Oura 官方會員條款') +
            ' · ' +
            products[0].monthly_subscription.verified_date +
            ' ↗'}
        </a>
      </section>
    </>
  );
}
