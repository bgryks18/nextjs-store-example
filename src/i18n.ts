import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { Locale } from './types/i18n'
import { getLocales } from './utils/getLocales'

// Can be imported from a shared config
const locales = getLocales()

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  const resources = (await import(`../public/resources`)).default
  return {
    messages: resources[locale as Locale],
  }
})
