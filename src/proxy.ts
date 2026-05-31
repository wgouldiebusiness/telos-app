import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function getMasterEmails(): string[] {
  return (process.env.MASTER_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
}

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
  const masterEmails = getMasterEmails()
  const isMaster = masterEmails.includes(user?.email?.toLowerCase() ?? '')

  // Unauthenticated: protect portal, admin, and onboarding
  if (!user) {
    if (
      pathname.startsWith('/portal') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/onboarding')
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return supabaseResponse
  }

  // Authenticated master accessing /portal -> send to /admin
  if (isMaster && pathname.startsWith('/portal')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Non-master accessing /admin -> send to /portal
  if (!isMaster && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  // Already logged in: redirect away from auth pages
  if (pathname === '/login' || pathname === '/signup') {
    const dest = isMaster ? '/admin' : '/portal'
    return NextResponse.redirect(new URL(dest, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
