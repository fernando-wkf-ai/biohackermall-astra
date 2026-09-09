import { headers } from 'next/headers';
import './globals.css';
import './home.css';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale =
    (await headers()).get('x-bhm-locale') === 'zh-HK' ? 'zh-HK' : 'en';
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('bhm-theme')==='light'?'light':'dark'}catch{}" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
