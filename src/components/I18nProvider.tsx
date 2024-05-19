import React, { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const I18nProvider = async ({ children }: { children: ReactNode }) => {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

export default I18nProvider
