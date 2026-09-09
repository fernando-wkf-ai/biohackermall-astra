import { products, type Product, type Fact } from './products';
export type VerificationStatus = 'pending' | 'partially_verified' | 'verified';
// Derive the product state from the same field-level evidence used by every view.
export function verification(product: Product) {
  const facts = Object.values(product).filter((v): v is Fact<number | boolean | null> => !!v && typeof v === 'object' && 'value' in v && 'verified_date' in v);
  if (product.battery_alternative) facts.push(product.battery_alternative.minimum, product.battery_alternative.maximum);
  const dates = facts.flatMap(f => f.verified_date ? [f.verified_date] : []).sort();
  const status: VerificationStatus = dates.length === facts.length && facts.length > 0 ? 'verified' : dates.length ? 'partially_verified' : 'pending';
  return { status, last_reviewed: dates.at(-1) ?? null, verified_date: status === 'verified' ? dates.at(-1)! : null, source_url: product.official_url };
}
export function verificationLabel(status: VerificationStatus, zh: boolean) {
  return ({ pending: ['Pending review', '待覆核'], partially_verified: ['Partially verified', '部分已核實'], verified: ['Verified', '已核實'] })[status][zh ? 1 : 0];
}
export function datasetVerification() {
  const states = products.map(verification);
  return { verified: states.filter(s => s.status === 'verified').length, partial: states.filter(s => s.status === 'partially_verified').length, pending: states.filter(s => s.status === 'pending').length, total: states.length };
}
