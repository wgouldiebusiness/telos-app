import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for a Supabase auth cookie (any sb-*-auth-token cookie)
  const hasSession = request.cookies.getAll().some(c => c.name.includes('auth-token'))

  if (pathname.startsWith('/portal') || pathname.startsWith('/admin') || pathname.startsWith('/onboarding')) {
    if (!hasSession) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*', '/onboarding/:path*'],
}
