import { headers } from 'next/headers';
import './globals.css';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale =
    (await headers()).get('x-bhm-locale') === 'zh-HK' ? 'zh-HK' : 'en';
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

