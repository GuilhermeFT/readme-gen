import { NextResponse, NextRequest } from 'next/server'
import { Locales } from './types/locales'

import { auth } from '@/auth'

export const locales: Locales[] = ['pt-BR', 'en']
export const defaultLocale: Locales = 'pt-BR'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('Accept-Language')

  if (!acceptLanguage) return defaultLocale

  const preferredLocales = acceptLanguage
    .split(',')
    .map((locale) => locale.split(';')[0])

  for (const preferredLocale of preferredLocales) {
    if (locales.includes(preferredLocale as Locales))
      return preferredLocale as Locales
  }

  return defaultLocale
}

export const middleware = auth((request: NextRequest) => {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  const pathnameHasLocale =
    locales.some(
      (locale) =>
        pathname.toLowerCase().startsWith(`/${locale.toLowerCase()}/`) ||
        pathname.toLowerCase() === `/${locale.toLowerCase()}`,
    ) && !pathname.toLowerCase().includes(defaultLocale)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }
  console.log(pathname)

  if (pathname.includes(defaultLocale)) {
    request.nextUrl.pathname = request.nextUrl.pathname.replace(
      `/${defaultLocale}`,
      '',
    )

    return NextResponse.redirect(request.nextUrl)
  }

  const locale = getLocale(request)

  if (locale === defaultLocale) {
    request.nextUrl.pathname = `${defaultLocale}${pathname}`
    return NextResponse.rewrite(request.nextUrl)
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(request.nextUrl)
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
