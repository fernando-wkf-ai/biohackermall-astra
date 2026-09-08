'use client';
import { useEffect, useState } from 'react';
export default function ThemeToggle({ zh }: { zh: boolean }) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    try {
      const v = localStorage.getItem('bhm-theme') === 'light';
      setLight(v);
      document.documentElement.dataset.theme = v ? 'light' : 'dark';
    } catch {}
  }, []);
  return (
    <button
      className="theme-button"
      aria-label={zh ? '切換明亮模式' : 'Toggle light mode'}
      aria-pressed={light}
      onClick={() => {
        const next = !light;
        setLight(next);
        document.documentElement.dataset.theme = next ? 'light' : 'dark';
        try {
          localStorage.setItem('bhm-theme', next ? 'light' : 'dark');
        } catch {}
      }}
    >
      {light ? '◐' : '☼'}
    </button>
  );
}

