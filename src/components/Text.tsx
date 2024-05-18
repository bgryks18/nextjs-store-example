import { useTranslations } from 'next-intl'
import React from 'react'

const Text = ({ i18nKey }: { i18nKey: string }) => {
  const t = useTranslations()
  return <>{t(i18nKey)}</>
}

export default Text
