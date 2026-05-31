import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protect portal and admin routes — must be logged in
  if ((pathname.startsWith('/portal') || pathname.startsWith('/admin')) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Restrict /admin to authorised emails only
  if (pathname.startsWith('/admin') && user) {
    const masterEmails = (process.env.MASTER_EMAILS ?? '')
      .split(',')
      .map(e => e.trim().toLowerCase())
    if (!masterEmails.includes(user.email?.toLowerCase() ?? '')) {
      return NextResponse.redirect(new URL('/portal', request.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if ((pathname === '/login' || pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
