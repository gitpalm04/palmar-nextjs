import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.AUTH_SECRET || 'fallback-secret-key-change-in-production'
const key = new TextEncoder().encode(secretKey)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas protegidas do admin
  if (pathname.startsWith('/admin')) {
    // Excluir a página de login
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get('session')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(token, key)
      return NextResponse.next()
    } catch {
      // Token inválido ou expirado
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
