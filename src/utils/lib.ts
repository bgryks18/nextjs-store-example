'use server'

import { RedirectType, redirect } from 'next/navigation'

export const redirectTo = async (path: string, type: string) => {
  redirect(path, type as RedirectType)
}
