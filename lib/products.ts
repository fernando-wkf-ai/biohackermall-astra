import catalog from '../data/products.generated.json' with { type: 'json' };
export type Fact<T> = {
  value: T;
  verified_date: string | null;
  source_url: string;
};
export type Product = {
  id: string;
  category: string;
  brand: string;
  model: string;
  currency: string;
  hardware_price: Fact<number>;
  monthly_subscription: Fact<number>;
  annual_subscription: Fact<number>;
  free_months: Fact<number>;
  iphone: Fact<boolean>;
  android: Fact<boolean>;
  battery_min: Fact<number | null>;
  battery_max: Fact<number>;
  battery_mode: string;
  battery_alternative: null | {
    mode: string;
    minimum: Fact<number>;
    maximum: Fact<number>;
  };
  official_url: string;
  affiliate_url: string | null;
  affiliate_status: string;
  affiliate_network: string | null;
  verified_date: string | null;
  data_status: string;
  availability_status: string;
  notes: Record<string, string>;
};
export const allProducts: Product[] = catalog as Product[];
export const products = allProducts
  .filter((p) => p.category === 'smartring')
  .sort(
    (a, b) =>
      ['oura', 'ringconn', 'ultrahuman', 'samsung'].indexOf(a.id) -
      ['oura', 'ringconn', 'ultrahuman', 'samsung'].indexOf(b.id),
  );
export type Phone = 'iphone' | 'android' | 'samsung';
export type Billing = 'monthly' | 'annual' | 'best';
export const money = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    v,
  );
export function calculate(
  p: Product,
  years: number,
  billing: Billing,
  phone: Phone,
) {
  if (
    !Number.isInteger(years) ||
    years < 1 ||
    years > 5 ||
    !['monthly', 'annual', 'best'].includes(billing) ||
    !['iphone', 'android', 'samsung'].includes(phone)
  )
    throw new Error('Invalid calculator input');
  const months = Math.max(0, years * 12 - p.free_months.value);
  const monthlyCents = months * Math.round(p.monthly_subscription.value * 100);
  const annualCharges = Math.ceil(months / 12);
  const annualCents =
    annualCharges * Math.round(p.annual_subscription.value * 100);
  const selected =
    billing === 'best'
      ? monthlyCents <= annualCents
        ? 'monthly'
        : 'annual'
      : billing;
  const subscription =
    (selected === 'monthly' ? monthlyCents : annualCents) / 100;
  return {
    id: p.id,
    hardware: p.hardware_price.value,
    subscription,
    total:
      (Math.round(p.hardware_price.value * 100) +
        Math.round(subscription * 100)) /
      100,
    compatible: phone === 'iphone' ? p.iphone.value : p.android.value,
    billing: selected,
    paidMonths: months,
    annualCharges,
  };
}
export function compare(years: number, billing: Billing, phone: Phone) {
  const rows = products.map((p) => ({
    ...calculate(p, years, billing, phone),
    product: p,
  }));
  const cheapest = Math.min(
    ...rows.filter((r) => r.compatible).map((r) => r.total),
  );
  return rows.map((r) => ({
    ...r,
    difference: Math.round((r.total - cheapest) * 100) / 100,
    cheapest: r.compatible && r.total === cheapest,
  }));
}
export function battery(p: Product, zh: boolean) {
  const max = p.battery_max.value,
    min = p.battery_min.value;
  const days = zh ? '天' : 'days';
  let result =
    min === null
      ? (zh ? '最長約 ' : 'Up to ~') + max + ' ' + days
      : min + '–' + max + ' ' + days;
  if (p.battery_mode === 'vibration_on')
    result += zh ? '（開啟震動）' : ' (vibration on)';
  return result;
}

