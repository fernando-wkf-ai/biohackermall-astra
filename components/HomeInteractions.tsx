'use client';
import { useEffect, useState } from 'react';
import { compare, money, type Phone } from '@/lib/products';
import { type Locale, pathFor, tx } from '@/lib/i18n';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function HomeMotion() {
 useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches || !('IntersectionObserver' in window)) return;
  const nodes = document.querySelectorAll<HTMLElement>('.premium-home .reveal');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  nodes.forEach(node => { node.classList.add('motion-ready'); observer.observe(node); });
  const revealAll = () => {
   observer.disconnect();
   nodes.forEach(node => node.classList.remove('motion-ready'));
  };
  const onMotionChange = () => { if (media.matches) revealAll(); };
  media.addEventListener('change', onMotionChange);
  return () => { revealAll(); media.removeEventListener('change', onMotionChange); };
 }, []);
 return null;
}

export function CostPreview({ locale }: { locale: Locale }) {
 const t = (en: string, zh: string) => tx(locale, en, zh);
 const [years, setYears] = useState(3);
 const [phone, setPhone] = useState<Phone>('iphone');
 const rows = compare(years, 'best', phone);
 const best = rows.find(r => r.cheapest);
 const scale = Math.max(...compare(5, 'best', phone).map(r => r.total));
 return <div className="cost-preview">
  <div className="preview-head"><span className="eyebrow">{t('OWNERSHIP EXPLORER', '持有成本探索')}</span><span className="chip">USD</span></div>
  <fieldset className="control-group"><legend>{t('Ownership period', '持有年期')}</legend><RadioGroup className="segmented" value={String(years)} onValueChange={v => setYears(Number(v))} aria-label={t('Ownership period', '持有年期')}>{[1,2,3,4,5].map(y => <div className={'choice ' + (years === y ? 'active' : '')} key={y}><RadioGroupItem id={`home-years-${y}`} value={String(y)} aria-label={`${y} ${t(y === 1 ? 'year' : 'years', '年')}`} /><span aria-hidden="true">{y} {t(y === 1 ? 'year' : 'years', '年')}</span></div>)}</RadioGroup></fieldset>
  <label className="preview-phone">{t('Your phone', '你的手機')}<select value={phone} onChange={e => setPhone(e.target.value as Phone)}><option value="iphone">iPhone</option><option value="android">Android</option><option value="samsung">Samsung Galaxy</option></select></label>
  <div className="preview-bars" aria-live="polite" aria-atomic="true">{rows.map(r => <div className={'preview-row ' + (!r.compatible ? 'incompatible' : '')} key={r.id}>
   <div className="bar-label"><span>{r.product.brand} {!r.compatible && <small>{t('Not compatible', '不相容')}</small>}</span><strong>{money(r.total)}</strong></div>
   <div className="cost-bar" aria-hidden="true"><span style={{width: `${r.hardware / scale * 100}%`}}/><i style={{width: `${r.subscription / scale * 100}%`}}/></div>
   <p className="bar-detail">{t('Hardware', '硬件')} {money(r.hardware)} <span>+ {t('membership', '會員費')} {money(r.subscription)}</span></p>
  </div>)}</div>
  <div className="preview-winner" aria-live="polite" aria-atomic="true"><span className="winner-dot"/><div>{t('Lowest compatible cost', '相容產品中的最低成本')}<strong>{best ? `${best.product.brand} ${best.product.model} · ${money(best.total)}` : t('No compatible option', '沒有相容選項')}</strong></div></div>
  <p className="preview-assumptions">{t('Base USD estimates · lower-cost monthly or annual billing · eligible free months included. Excludes tax, shipping, discounts and optional services.', '美元基本估算 · 自動選擇較低月費或年費 · 包含合資格免費期。不包括稅項、運費、優惠及選購服務。')}</p>
  <a className="text-link" href={pathFor(locale,'smartring/cost-calculator')}>{t('Open full calculator & assumptions', '開啟完整計算機及計算假設')} ↗</a>
 </div>;
}
