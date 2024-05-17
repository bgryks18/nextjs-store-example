import { CartItemEntity, UserSessionIdEntity } from '@/types/cart'
import { atom } from 'jotai'

export const currentUserState = atom<UserSessionIdEntity | null>(null)

export const isLoggedInState = atom<boolean>((get) =>
  Boolean(get(currentUserState))
)

export const cartState = atom<CartItemEntity[] | null>(null)
