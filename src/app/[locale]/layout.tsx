import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import Theme from '@/components/Theme/Theme'
import JotaiProvider from '@/components/Layout/Provider'
import ReactQueryProvider from '@/components/Layout/QueryClient'
import NotificationProvider from '@/components/Layout/NotificationProvider'

const ubuntu = Ubuntu({
  subsets: ['latin-ext', 'cyrillic-ext', 'greek-ext'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: Record<string, any>
}>) {
  return (
    <html lang={locale}>
      <body className={ubuntu.className}>
        <JotaiProvider>
          <ReactQueryProvider>
            <Theme>
              <NotificationProvider>{children}</NotificationProvider>
            </Theme>
          </ReactQueryProvider>
        </JotaiProvider>
      </body>
    </html>
  )
}
