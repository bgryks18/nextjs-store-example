import { CartItemEntity } from '@/types/cart'
import { atom } from 'jotai'

export const cartState = atom<CartItemEntity[]>([])
