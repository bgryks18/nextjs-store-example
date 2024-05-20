import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { getLocales } from './getLocales'

export const locales = getLocales()
export const localePrefix = 'always' // Default

export const {
  Link: NavigationLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({ locales, localePrefix })
