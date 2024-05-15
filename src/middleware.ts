import createMiddleware from 'next-intl/middleware'
import { getLocales } from './utils/getLocales'

const availableLocales = getLocales()

export default createMiddleware({
  // A list of all locales that are supported
  locales: availableLocales,

  // Used when no locale matches
  defaultLocale: 'en',
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/([a-zA-Z]{2,3})/:path*'],
}
