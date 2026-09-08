import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate, compare, products } from '../lib/products.ts';
const oura = products.find((p) => p.id === 'oura')!;
test('Oura new member cash costs for every ownership year', () => {
  const monthly = [464.89, 536.77, 608.65, 680.53, 752.41];
  const annual = [468.99, 538.98, 608.97, 678.96, 748.95];
  for (let years = 1; years <= 5; years++) {
    assert.equal(
      calculate(oura, years, 'monthly', 'iphone').total,
      monthly[years - 1],
    );
    assert.equal(
      calculate(oura, years, 'annual', 'iphone').total,
      annual[years - 1],
    );
    assert.equal(
      calculate(oura, years, 'best', 'iphone').total,
      Math.min(monthly[years - 1], annual[years - 1]),
    );
  }
});
test('45 phone, duration and billing combinations retain four products and neutral cheapest logic', () => {
  for (const phone of ['iphone', 'android', 'samsung'] as const)
    for (const years of [1, 2, 3, 4, 5])
      for (const billing of ['monthly', 'annual', 'best'] as const) {
        const rows = compare(years, billing, phone);
        assert.equal(rows.length, 4);
        const samsung = rows.find((r) => r.id === 'samsung')!;
        assert.equal(samsung.compatible, phone !== 'iphone');
        assert.equal(rows.find((r) => r.cheapest)?.id, 'ringconn');
        for (const r of rows) {
          if (r.id !== 'oura') assert.equal(r.subscription, 0);
          assert.equal(r.difference, Math.round((r.total - 349) * 100) / 100);
        }
      }
});
test('trial boundary uses complete annual blocks and no negative months', () => {
  const p = { ...oura, free_months: { ...oura.free_months, value: 12 } };
  assert.equal(calculate(p, 1, 'annual', 'iphone').subscription, 0);
  assert.equal(calculate(p, 2, 'annual', 'iphone').subscription, 69.99);
  const existing = { ...oura, free_months: { ...oura.free_months, value: 0 } };
  assert.equal(calculate(existing, 1, 'monthly', 'iphone').subscription, 71.88);
});
test('affiliate status and URL cannot influence results', () => {
  const baseline = calculate(oura, 5, 'best', 'iphone');
  assert.deepEqual(
    calculate(
      {
        ...oura,
        affiliate_status: 'approved',
        affiliate_url: 'https://example.com/',
      },
      5,
      'best',
      'iphone',
    ),
    baseline,
  );
});
test('reject invalid duration, phone and billing', () => {
  for (const years of [0, 6, 1.5, NaN])
    assert.throws(() => calculate(oura, years, 'best', 'iphone'));
  assert.throws(() => calculate(oura, 3, 'invalid' as any, 'iphone'));
  assert.throws(() => calculate(oura, 3, 'best', 'invalid' as any));
});

