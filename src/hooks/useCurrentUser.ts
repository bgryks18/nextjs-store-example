'use client'
import { useAtom, useAtomValue } from 'jotai'
import { cartState, currentUserState, isLoggedInState } from '@/store/user'

export const useCurrentUser = () => {
  const [curentUser, setCurrentUser] = useAtom(currentUserState)
  const [cart, setCart] = useAtom(cartState)
  const isLoggedIn = useAtomValue(isLoggedInState)
  return {
    curentUser,
    setCurrentUser,
    isLoggedIn,
    cart: Array.isArray(cart) ? cart.filter((item) => item.quantity > 0) : cart,
    cartCount: Array.isArray(cart)
      ? cart.filter((item) => item.quantity > 0).length
      : 0,
    cartTotal: Array.isArray(cart)
      ? cart
          .map((item) => item.quantity * item.price)
          .reduce((prev, current) => prev + current, 0)
      : 0,
    setCart,
  }
}
