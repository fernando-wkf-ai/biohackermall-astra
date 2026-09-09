export type Locale = 'en' | 'zh-HK';
export const origin = 'https://biohackermall.com';
export const pathFor = (locale: Locale, path = '') =>
  (locale === 'zh-HK' ? '/zh-hk/' : '/') +
  (path ? path.replace(/^\/+|\/+$/g, '') + '/' : '');
export const tx = (locale: Locale, en: string, zh: string) =>
  locale === 'zh-HK' ? zh : en;
export const pages: Record<
  string,
  { en: [string, string]; 'zh-HK': [string, string] }
> = {
  '': {
    en: [
      'BiohackerMall — Product intelligence & decision tools',
      'Independent research, decision tools and curated product intelligence for sleep, recovery, performance and longevity.',
    ],
    'zh-HK': [
      'BiohackerMall — 生物黑客產品情報及決策工具',
      '以獨立研究、數據比較與決策工具，幫助你選擇改善睡眠、恢復、表現與長期健康的科技產品。',
    ],
  },
  smartring: {
    en: [
      'Smart Ring Decision Tools | BiohackerMall',
      'Compare smart ring ownership costs, subscriptions, phone compatibility and battery estimates in one transparent view.',
    ],
    'zh-HK': [
      '智能戒指決策工具 | BiohackerMall',
      '一站比較智能戒指的持有成本、訂閱費、手機相容性及電池續航估算。',
    ],
  },
  'smartring/cost-calculator': {
    en: [
      'Smart Ring Total Cost Calculator | BiohackerMall',
      'Calculate one to five years of smart ring hardware and membership costs for your phone, with transparent billing assumptions.',
    ],
    'zh-HK': [
      '智能戒指總成本計算機 | BiohackerMall',
      '按你的手機及持有年期，計算一至五年的智能戒指硬件及會員費用，清楚展示計費假設。',
    ],
  },
  about: {
    en: [
      'About BiohackerMall',
      'How BiohackerMall helps you make informed biohacking product decisions using transparent data and practical tools.',
    ],
    'zh-HK': [
      '關於 BiohackerMall',
      '了解 BiohackerMall 如何以透明數據及實用工具，協助你作出更有根據的產品選擇。',
    ],
  },
  'affiliate-disclosure': {
    en: [
      'Affiliate Disclosure | BiohackerMall',
      'How affiliate links support BiohackerMall, and why commercial relationships do not determine calculator results.',
    ],
    'zh-HK': [
      '聯盟連結披露 | BiohackerMall',
      '了解聯盟連結如何支持 BiohackerMall，以及商業合作為何不影響計算結果。',
    ],
  },
};
