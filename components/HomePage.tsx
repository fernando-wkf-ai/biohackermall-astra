import { Activity, ArrowUpRight, Battery, CircleDot, Fingerprint, Moon, ScanLine, ShieldCheck, Sun, Timer, TrendingUp, Waves, Watch, Zap } from 'lucide-react';
import { type Locale, pathFor, tx } from '@/lib/i18n';
import { products, battery, money, compare } from '@/lib/products';
import { verification, verificationLabel } from '@/lib/verification';
import { Disclosure } from './Shell';
import { HomeMotion, CostPreview } from './HomeInteractions';
import VerificationNotice from './VerificationNotice';

function Signal({ variant = 0 }: { variant?: number }) {
 return <svg viewBox="0 0 300 90" fill="none" className={'signal signal-' + variant} aria-hidden="true"><path className="signal-grid" d="M0 25H300M0 55H300M0 85H300M50 0V90M100 0V90M150 0V90M200 0V90M250 0V90"/><path className="signal-line" pathLength="100" d={variant === 1 ? 'M0 65H25V35H58V68H84V47H110V65H138V22H164V49H190V30H226V58H255V20H300' : variant === 2 ? 'M0 78L25 70L50 74L75 55L100 60L125 42L150 48L175 25L200 35L225 15L250 22L275 8L300 12' : 'M0 48L20 48L28 42L36 51L48 47L60 48L75 48L85 24L94 77L107 10L118 56L132 48L160 48L178 40L190 50L210 48L228 48L238 22L248 70L260 14L274 50L300 48'}/></svg>;
}

export default function HomePage({ locale }: { locale: Locale }) {
 const zh = locale === 'zh-HK';
 const t = (en: string, cn: string) => tx(locale,en,cn);
 const hub = pathFor(locale,'smartring');
 const calculator = pathFor(locale,'smartring/cost-calculator');
 const snapshots = compare(3,'best','iphone');
 const goals = [
  { name: t('Sleep','睡眠'), desc: t('Track sleep, recovery and circadian signals.','追蹤睡眠、恢復及晝夜節律訊號。'), icon: Moon, detail: t('Start with sleep patterns and overnight comfort. Compare battery life and phone support before choosing a ring.','先了解睡眠規律及夜間佩戴舒適度，再比較續航及手機支援。') },
  { name: t('Recovery','恢復'), desc: t('Understand readiness, HRV and physical recovery.','了解身體準備度、心率變異度及身體恢復。'), icon: Activity, detail: t('Look for consistent trends, not a single readiness score. Check what requires a subscription.','留意持續趨勢，而非單一準備度分數；查看哪些功能需要訂閱。') },
  { name: t('Performance','表現'), desc: t('Explore technology for training and human performance.','探索提升訓練及人體表現的科技。'), icon: Zap, detail: t('Consider your training routine, device compatibility and charging habits. More metrics do not automatically mean better decisions.','考慮訓練習慣、裝置相容性及充電安排。更多指標未必代表更好的決策。') },
  { name: t('Longevity','長期健康'), desc: t('Understand long-term health and behavioural signals.','了解長期健康及行為訊號。'), icon: Fingerprint, detail: t('Prioritize sustainable habits and useful long-term trends. Consumer scores are not a diagnosis or a promise of longer life.','優先考慮可持續的習慣及長期趨勢。消費級評分並非診斷，亦不保證延長壽命。') },
 ];
 const verticals = [
  [t('Smart Rings','智能戒指'),t('Available now','現已推出'),CircleDot],
  [t('Sleep Technology','睡眠科技'),t('Coming next','下一步推出'),Moon],
  [t('Red Light Therapy','紅光療法'),t('Researching','研究中'),Sun],
  [t('Recovery Technology','恢復科技'),t('Coming soon','即將推出'),Waves],
  [t('Continuous Glucose Monitoring','連續血糖監測'),t('Planned','規劃中'),Activity],
  [t('Wearables','穿戴式裝置'),t('Planned','規劃中'),Watch],
 ] as const;
 return <div className="premium-home"><HomeMotion/>
  <section className="bio-hero">
   <div className="hero-copy"><p className="eyebrow"><span className="live-dot"/>{t('BIOLOGY, MEET TECHNOLOGY','當人體生物學遇上科技')}</p>
    <h1>{zh ? <>探索真正適合你的<br/><em>人體優化科技。</em></> : <>Discover better<br/>technology for<br/><em>better biology.</em></>}</h1>
    <p className="lede">{t('Independent research, decision tools and curated product intelligence for sleep, recovery, performance and longevity.','以獨立研究、數據比較與決策工具，幫助你選擇改善睡眠、恢復、表現與長期健康的科技產品。')}</p>
    <div className="hero-actions"><a className="button primary" href={hub}>{t('Explore Smart Rings','探索智能戒指')}<ArrowUpRight size={18}/></a><a className="button secondary" href={calculator}>{t('Use Decision Tools','使用決策工具')}<span>→</span></a></div>
    <div className="hero-footnote"><ShieldCheck size={16}/><span>{t('Independent by design. Informed by evidence.','以獨立為原則，以證據作依據。')}</span></div>
   </div>
   <div className="biology-interface" role="group" aria-label={t('Illustrative biology and technology dashboard; not measured health data','人體生物學與科技示意介面；並非實測健康數據')}>
    <div className="interface-header"><span><ScanLine size={16}/> {t('BIOLOGICAL SIGNALS','生理訊號')}</span><span className="demo-badge">{t('ILLUSTRATIVE','示意數據')}</span></div>
    <div className="interface-core"><div className="orbit-label orbit-label-top">{t('SIGNAL → INSIGHT','訊號 → 洞察')}</div><div className="score-dial"><svg viewBox="0 0 240 240" aria-hidden="true"><circle className="dial-track" cx="120" cy="120" r="105"/><circle className="dial-value" cx="120" cy="120" r="105" pathLength="100"/><circle className="dial-inner" cx="120" cy="120" r="86"/></svg><div><span>{t('RECOVERY','恢復指數')}</span><strong>92<span>/100</span></strong><small><span className="live-dot"/>{t('Ready for today','準備迎接今天')}</small></div></div><div className="orbit-label orbit-label-bottom">{t('HUMAN × TECHNOLOGY × DATA','人體 × 科技 × 數據')}</div></div>
    <div className="metric-float metric-hrv"><span><Activity size={15}/> HRV</span><strong>64 <small>ms</small><i>↗ 8%</i></strong><Signal/></div>
    <div className="metric-float metric-sleep"><span><Moon size={15}/>{t('Sleep score','睡眠分數')}</span><strong>87 <small>/100</small></strong><div className="sleep-timeline" aria-hidden="true">{[23,38,25,46,29,38,20,45,30,46,25,38].map((h,i)=><i key={i} style={{height:h+'px'}}/>)}</div></div>
    <div className="interface-bottom"><span><Battery size={16}/>{t('Signals in context','理解訊號背後的意義')}</span><span>{t('Better decisions','更有根據的決策')} ↗</span></div>
   </div>
  </section>
  <div className="journey-strip"><span>{t('YOUR NEXT CHAPTER','你的下一步')}</span><div>{[t('Discover','探索'),t('Understand','了解'),t('Compare','比較'),t('Decide','決定')].map((s,i)=><span key={s}>{s}{i<3 && <b aria-hidden="true">→</b>}</span>)}</div><span>{t('Technology. On your terms.','為你而選的科技。')}</span></div>
  <section className="home-section" id="goals"><div className="section-heading"><div><p className="eyebrow">01 / {t('START WITH YOU','從你出發')}</p><h2>{t('What are you optimizing?','你想優化甚麼？')}</h2></div><p>{t('Your goal comes before the device.','先了解目標，再選擇裝置。')}</p></div>
   <div className="goal-grid">{goals.map((g,i)=><details className={'goal-card reveal goal-'+i} key={g.name} style={{'--order':i} as React.CSSProperties}><summary><g.icon size={25}/><Signal variant={i%3}/><h3>{g.name}<span aria-hidden="true">+</span></h3><p>{g.desc}</p></summary><div className="goal-detail"><p>{g.detail}</p><a href={hub}>{t('Explore smart ring intelligence','探索智能戒指情報')} ↗</a></div></details>)}</div>
  </section>
  <section className="home-section" id="discover"><div className="section-heading"><div><p className="eyebrow">02 / {t('THE TECHNOLOGY LANDSCAPE','科技版圖')}</p><h2>{t('Explore biohacking technology.','探索人體優化科技。')}</h2></div><p>{t('One platform. A wider perspective.','一個平台，更廣闊的視野。')}</p></div>
   <div className="vertical-grid">{verticals.map(([name,status,Icon],i)=> { const inside = <><div className="vertical-top"><Icon size={28}/><span className="vertical-status">{i===0 && <span className="live-dot"/>}{status}</span></div><h3>{name}</h3>{i===0 ? <><p>{t('Small devices. Meaningful decisions.','小巧裝置，值得深思的選擇。')}</p><span className="vertical-cta">{t('Compare Smart Rings','比較智能戒指')}<ArrowUpRight size={20}/></span></> : <p>{t('Part of our research roadmap.','平台研究路線的一部分。')}</p>}</>; return i===0 ? <a className="vertical-card featured reveal" href={hub} key={name}>{inside}</a> : <article className="vertical-card reveal" key={name} style={{'--order':i%3} as React.CSSProperties}>{inside}</article>; })}</div>
  </section>
  <section className="framework home-section" id="approach"><p className="eyebrow">03 / {t('THE BIOHACKERMALL STANDARD','BIOHACKERMALL 原則')}</p><div className="section-heading"><h2>{t('Less guesswork. More clarity.','減少猜測，看得更清楚。')}</h2><a className="text-link" href={pathFor(locale,'about')}>{t('Our methodology','我們的方法')} ↗</a></div>
   <div className="framework-grid">{[
    {label:t('COMPARE','比較'),title:t('Beyond the claims.','不止於宣傳。'),desc:t('Compare normalized specifications instead of marketing claims.','以統一規格比較，取代營銷宣稱。'),Icon:ScanLine,href:hub+'#product-data'},
    {label:t('CALCULATE','計算'),title:t('Beyond the price tag.','不止於標價。'),desc:t('Understand the real cost of ownership, including subscriptions.','了解包括訂閱在內的真正持有成本。'),Icon:TrendingUp,href:calculator},
    {label:t('VERIFY','核實'),title:t('Back to the source.','回到資料來源。'),desc:t('See when information was reviewed and where it came from.','查看資料何時覆核，以及來自哪個來源。'),Icon:ShieldCheck,href:hub+'#product-data'}
   ].map((f,i)=><a className="framework-step reveal" href={f.href} key={f.label} style={{'--order':i} as React.CSSProperties}><div><span>0{i+1}</span><f.Icon size={30}/></div><h3>{f.label}<ArrowUpRight size={23}/></h3><strong>{f.title}</strong><p>{f.desc}</p></a>)}</div>
  </section>
  <section className="home-section" id="intelligence"><div className="section-heading"><div><p className="eyebrow">04 / {t('FIRST LIVE VERTICAL','首個已推出類別')}</p><h2>{t('Featured smart ring intelligence.','精選智能戒指情報。')}</h2></div><a className="text-link" href={hub}>{t('Explore the Smart Ring hub','探索智能戒指中心')} ↗</a></div>
   <p className="home-data-note"><VerificationNotice locale={locale}/></p>
   <div className="intelligence-grid">{products.map((p,i)=>{const v=verification(p); return <article className="intelligence-card reveal" key={p.id} style={{'--order':i} as React.CSSProperties}><div className="intelligence-brand"><span>0{i+1}</span><CircleDot size={23}/></div><p className="eyebrow">{p.brand}</p><h3>{p.model}</h3><span className="verification-pill">{verificationLabel(v.status,zh)}</span><div className="hardware-price">{money(p.hardware_price.value)}<span>{t('base hardware · USD','基本硬件價格 · 美元')}</span></div><dl><div><dt>{t('Membership','會員費')}</dt><dd>{p.monthly_subscription.value ? money(p.monthly_subscription.value)+t('/mo','／月') : t('No mandatory fee','無強制收費')}</dd></div><div><dt>{t('Battery','續航')}</dt><dd>{battery(p,zh)}</dd></div><div><dt>{t('Phone','手機')}</dt><dd>{p.iphone.value ? 'iOS · ' : ''}{p.android.value ? 'Android' : ''}</dd></div><div className="snapshot"><dt>{t('3-year estimate¹','3 年估算¹')}</dt><dd>{money(snapshots[i].total)}</dd></div></dl><a className="product-link" href={hub+'#product-data'}>{t('View facts & sources','查看資料及來源')} ↗</a></article>})}</div>
   <p className="home-data-note">{t('¹ Base hardware + lower-cost monthly or annual membership over 3 years. Compatibility is checked separately; Samsung is not iPhone-compatible in the current dataset.','¹ 基本硬件價格加 3 年內較低的月費或年費。相容性另行檢查；目前數據中的 Samsung 不支援 iPhone。')} <a className="text-link" href={calculator}>{t('Adjust in Cost Calculator','使用成本計算機調整')} ↗</a></p>
  </section>
  <section className="home-section decision-section" id="tools"><div className="decision-copy"><p className="eyebrow">05 / {t('DECISION TOOLS','決策工具')}</p><div className="tool-glyph"><Timer size={30}/></div><h2>{t('The price tag is','標價，')}<br/><em>{t('only the beginning.','只是開始。')}</em></h2><p>{t('A ring is a one-time purchase. A subscription is a long-term decision. See them together before you commit.','戒指只需購買一次，訂閱卻是長期決定。選購前，先看清兩者的總成本。')}</p><a className="button primary" href={calculator}>{t('Calculate your true cost','計算你的真正成本')}<ArrowUpRight size={18}/></a><div className="tool-benefits"><span>01 <b>{t('Set your ownership period','設定持有年期')}</b></span><span>02 <b>{t('See the subscription effect','了解訂閱的影響')}</b></span><span>03 <b>{t('Find your compatible option','找出相容選項')}</b></span></div></div><CostPreview locale={locale}/></section>
  <section className="home-section trust-section" id="methodology"><div className="section-heading"><div><p className="eyebrow">06 / {t('CLARITY IS THE PRODUCT','清晰透明，就是價值')}</p><h2>{t('Trust you can look into.','經得起查證的信任。')}</h2></div><ShieldCheck size={35}/></div><div className="trust-grid">{[
   [t('Independent research','獨立研究'),t('The question comes first. Commercial relationships do not decide the answer.','先提出問題；商業合作不決定答案。')],
   [t('Official-source verification','官方來源核實'),t('Sources and review states stay visible, including the gaps.','來源及覆核狀態清楚可見，包括尚未完成的部分。')],
   [t('One dataset, multiple languages','同一數據，多種語言'),t('English and Traditional Chinese draw on the same product facts.','英文與繁體中文均使用同一份產品資料。')],
   [t('Commerce does not control ranking','商業合作不控制排名'),t('Affiliate relationships never change calculator results. We do not currently sell or stock products.','聯盟合作不影響計算結果。我們目前並不直接銷售或備存產品。')]
  ].map(([title,desc],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div><div className="trust-status"><ShieldCheck size={20}/><VerificationNotice locale={locale}/></div></section>
  <Disclosure locale={locale}/>
 </div>;
}
