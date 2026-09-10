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
      'Understand, compare and choose biohacking products with transparent data, calculators and decision tools.',
    ],
    'zh-HK': [
      'BiohackerMall — 生物黑客產品情報及決策工具',
      '透過透明數據、比較及計算工具，了解並選擇適合你的生物黑客產品。',
    ],
  },
  smartring: {
    en: [
      'Why Wear a Smart Ring? Find Your Fit | BiohackerMall',
      'Keep your watch, explore screenless sleep and recovery tracking, check your fit, then compare smart rings and true ownership costs.',
    ],
    'zh-HK': [
      '為甚麼要戴智能戒指？找出適合你的選擇 | BiohackerMall',
      '保留你的愛錶，探索無螢幕睡眠與恢復追蹤，了解是否適合你，再比較智能戒指及真正持有成本。',
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

