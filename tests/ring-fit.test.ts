import { test } from 'node:test';
import assert from 'node:assert/strict';
import { qualifyRing, type FitAnswer } from '../lib/ring-fit.ts';
void test('watch owner who dislikes wearing it in bed can qualify', () =>
  assert.equal(
    qualifyRing(['yes', 'yes', 'no', 'yes', 'no', 'yes', 'yes']),
    'ring',
  ));
void test('traditional watch owner can qualify without owning a smartwatch', () =>
  assert.equal(
    qualifyRing(['no', 'no', 'yes', 'yes', 'no', 'yes', 'no']),
    'ring',
  ));
void test('wanting a screen routes toward a smartwatch', () =>
  assert.equal(
    qualifyRing(['yes', 'no', 'yes', 'yes', 'yes', 'yes', 'yes']),
    'watch',
  ));
void test('happy existing watch owner is not pushed to buy more', () =>
  assert.equal(
    qualifyRing(['no', 'yes', 'no', 'yes', 'no', 'yes', 'no']),
    'keep',
  ));
void test('no sleep interest or dislike of passive tracking gives no purchase push', () => {
  assert.equal(
    qualifyRing(['yes', 'no', 'yes', 'no', 'no', 'yes', 'yes']),
    'keep',
  );
  assert.equal(
    qualifyRing(['yes', 'no', 'yes', 'yes', 'no', 'no', 'yes']),
    'keep',
  );
});
void test('uncertainty remains uncertainty', () =>
  assert.equal(qualifyRing(Array(7).fill('unsure')), 'consider'));
void test('all combinations are deterministic, neutral and defined', () => {
  const values: FitAnswer[] = ['yes', 'no', 'unsure'];
  const counts: Record<string, number> = {};
  for (let n = 0; n < 2187; n++) {
    let k = n;
    const answers: FitAnswer[] = [];
    for (let j = 0; j < 7; j++) {
      answers.push(values[k % 3]);
      k = Math.floor(k / 3);
    }
    const result = qualifyRing(answers);
    assert.ok(['ring', 'consider', 'watch', 'keep'].includes(result));
    counts[result] = (counts[result] ?? 0) + 1;
  }
  assert.equal(Object.keys(counts).length, 4);
});
void test('incomplete or invalid input cannot generate advice', () => {
  assert.throws(() => qualifyRing([]));
  assert.throws(() =>
    qualifyRing(['bad', ...Array(6).fill('yes')] as FitAnswer[]),
  );
});

void test('strong watch motivations cannot override uncertain sleep interest',()=>assert.equal(qualifyRing(['yes','no','yes','unsure','no','yes','yes']),'consider'));
