import { datasetVerification } from '@/lib/verification';
import { type Locale, tx } from '@/lib/i18n';
export default function VerificationNotice({ locale }: { locale: Locale }) {
 const s = datasetVerification();
 return <span>{tx(locale, `${s.verified}/${s.total} products fully verified · ${s.partial} partially verified · ${s.pending} pending review. Baseline estimates; consult the official sources before deciding.`, `${s.verified}/${s.total} 款產品已完整核實 · ${s.partial} 款部分已核實 · ${s.pending} 款待覆核。數據為基本估算；作出決定前請查閱官方來源。`)}</span>;
}
