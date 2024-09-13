import { NextResponse, NextRequest } from 'next/server'
import { Locales } from './types/locales'

export const locales: Locales[] = ['pt-br', 'en']
const defaultLocale: Locales = 'pt-br'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('Accept-Language')
  if (!acceptLanguage) return defaultLocale

  const preferredLocales = acceptLanguage
    .split(',')
    .map((locale) => locale.split(';')[0].toLowerCase())

  for (const preferredLocale of preferredLocales) {
    if (locales.includes(preferredLocale as Locales))
      return preferredLocale as Locales
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale =
    locales.some(
      (locale) =>
        pathname.toLowerCase().startsWith(`/${locale.toLowerCase()}/`) ||
        pathname.toLowerCase() === `/${locale.toLowerCase()}`,
    ) && !pathname.toLowerCase().includes(defaultLocale)

  console.log(pathnameHasLocale)

  if (pathnameHasLocale) return

  if (pathname.toLowerCase().includes(defaultLocale)) {
    request.nextUrl.pathname = request.nextUrl.pathname.replace(
      `/${defaultLocale}`,
      '',
    )

    return NextResponse.redirect(request.nextUrl)
  }

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  if (locale === defaultLocale) {
    return NextResponse.rewrite(request.nextUrl)
  }

  /*  if (locale === defaultLocale) {
    request.nextUrl.pathname = request.nextUrl.pathname.replace(
      `/${locale}`,
      '',
    )
    console.log('aqui')

    return NextResponse.redirect(request.nextUrl)
  } */

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
