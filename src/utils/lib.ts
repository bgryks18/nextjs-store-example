'use server'

import { RedirectType, redirect } from 'next/navigation'

export const redirectTo = (path: string, type: string) => {
  redirect(path, type as RedirectType)
}
