import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import Theme from '@/components/Theme/Theme'
import JotaiProvider from '@/components/Layout/Provider'
import ReactQueryProvider from '@/components/Layout/QueryClient'

import '@/app/styles/app.scss'
import NotificationProvider from '@/components/Layout/NotificationProvider'
import I18nProvider from '@/components/I18nProvider'

const ubuntu = Ubuntu({
  subsets: ['latin-ext', 'cyrillic-ext', 'greek-ext'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Google Book Store',
  description: 'Discover new books',
}

export default function AppLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: Record<string, any>
}>) {
  return (
    <html lang={locale}>
      <body className={ubuntu.className}>
        <I18nProvider>
          <JotaiProvider>
            <ReactQueryProvider>
              <Theme>
                <NotificationProvider>{children}</NotificationProvider>
              </Theme>
            </ReactQueryProvider>
          </JotaiProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
