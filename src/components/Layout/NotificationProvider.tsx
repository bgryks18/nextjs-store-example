'use client'
import { SnackbarProvider } from 'notistack'
import React, { FC, PropsWithChildren } from 'react'

const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <SnackbarProvider>{children}</SnackbarProvider>
    </div>
  )
}

export default NotificationProvider
