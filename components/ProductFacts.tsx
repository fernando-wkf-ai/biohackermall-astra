import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { products, battery, money } from '@/lib/products';
import { Locale, tx } from '@/lib/i18n';
export default function ProductFacts({ locale, showImages = false }: { locale: Locale; showImages?: boolean }) {
  const t = (en: string, zh: string) => tx(locale, en, zh);
  return (
    <section className="section" id="product-data">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('SHARED PRODUCT DATA', '共用產品數據')}</p>
          <h2>{t('The facts behind the tools.', '工具背後的產品資料。')}</h2>
        </div>
        <span className="chip">{t('USD baseline', '美元基本價格')}</span>
      </div>
      <div className="data-notice">
        <strong>{t('Verification in progress.', '資料核實中。')}</strong>{' '}
        {t(
          'Hardware, compatibility and battery figures are the project’s starting dataset, pending a full official-source review. Oura membership prices and its included month were checked on 8 September 2026.',
          '硬件價格、相容性及電池資料來自專案起始數據，尚待全面核對官方來源。Oura 會員價格及免費月份已於 2026 年 9 月 8 日查看。',
        )}
      </div>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label={t(
          'Product facts; scroll horizontally',
          '產品資料；可橫向捲動',
        )}
      >
        <Table className="comparison-table">
          <TableCaption>
            {t(
              'Battery figures are manufacturer-style estimates supplied in the brief; real use varies.',
              '電池數字為起始資料中的估算，實際使用時間會有所不同。',
            )}
          </TableCaption>
          <TableHeader>
            <TableRow>
              {[
                t('Product', '產品'),
                t('Base price', '基本價格'),
                t('Membership / month / year', '會員費／月／年'),
                'iPhone',
                'Android',
                t('Battery estimate', '電池續航估算'),
                t('Last verified', '最後核實'),
              ].map((h) => (
                <TableHead scope="col" key={h}>
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableHead scope="row">
                  <a href={p.official_url}>
                    {showImages && <img className="sr-table-image" src={`/smartring-media/${p.id}.webp`} width="72" height="60" loading="lazy" alt="" />}
                    {p.brand} {p.model} ↗
                  </a>
                </TableHead>
                <TableCell>{money(p.hardware_price.value)}</TableCell>
                <TableCell>
                  {money(p.monthly_subscription.value)} /{' '}
                  {money(p.annual_subscription.value)}
                  {p.free_months.value > 0 && (
                    <small>
                      {p.free_months.value}{' '}
                      {t(
                        'month included for eligible new members',
                        '個月免費期，適用於合資格新會員',
                      )}
                    </small>
                  )}
                </TableCell>
                <TableCell>
                  {p.iphone.value ? t('Yes', '支援') : t('No', '不支援')}
                </TableCell>
                <TableCell>
                  {p.android.value ? t('Yes', '支援') : t('No', '不支援')}
                </TableCell>
                <TableCell>
                  {battery(p, locale === 'zh-HK')}
                  {p.battery_alternative && (
                    <small>
                      {p.battery_alternative.minimum.value}–
                      {p.battery_alternative.maximum.value}{' '}
                      {t('days, vibration off', '天，關閉震動')}
                    </small>
                  )}
                </TableCell>
                <TableCell>
                  {p.verified_date ?? t('Pending review', '待覆核')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="source-grid">
        {products.map((p) => (
          <details key={p.id}>
            <summary>
              {p.brand} {p.model} · {t('Sources & notes', '來源及備註')}
            </summary>
            <p>{p.notes[locale]}</p>
            <p>
              {t(
                'Product facts: supplied baseline; not yet independently verified.',
                '產品資料：由專案提供，尚未獨立核實。',
              )}
            </p>
            <a className="text-link" href={p.official_url}>
              {t('Official product source ↗', '官方產品來源 ↗')}
            </a>
            {p.monthly_subscription.verified_date && (
              <p>
                <a
                  className="text-link"
                  href={p.monthly_subscription.source_url}
                >
                  {t('Membership source', '會員資料來源')}
                </a>{' '}
                · {p.monthly_subscription.verified_date}
              </p>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}

