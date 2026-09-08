import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(
    'x-bhm-locale',
    request.nextUrl.pathname === '/zh-hk' ||
      request.nextUrl.pathname.startsWith('/zh-hk/')
      ? 'zh-HK'
      : 'en',
  );
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ['/((?!_next|admin|favicon.ico).*)'] };

