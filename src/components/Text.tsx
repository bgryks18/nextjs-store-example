import { TranslationValues, useTranslations } from 'next-intl'
import React from 'react'

const Text = ({
  i18nKey,
  values,
}: {
  i18nKey: string
  values?: TranslationValues
}) => {
  const t = useTranslations()
  return <>{t(i18nKey, values)}</>
}

export default Text
