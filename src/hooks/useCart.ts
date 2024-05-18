'use client'
import { useAtom, useAtomValue } from 'jotai'
import { cartState } from '@/store/user'
import { Volume } from '@/types/book'

export const useCart = () => {
  const [cart, setCart] = useAtom(cartState)

  const addToCart = (cartItem: Volume) => {
    if (cart.find((item) => cartItem.id === item.id)) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === cartItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }
          return item
        })
      )
    } else {
      setCart((prev) => {
        return [
          ...prev,
          {
            id: cartItem.id,
            title: cartItem.volumeInfo.title,
            quantity: 1,
            volume: cartItem,
          },
        ]
      })
    }
  }

  const removeFromCart = (id: string) => {
    const itemToRemoved = cart.find((item) => item.id === id)

    if (!itemToRemoved) return

    if (itemToRemoved.quantity > 1) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }
          return item
        })
      )
    } else {
      setCart((prev) => {
        return prev.filter((item) => item.id !== id)
      })
    }
  }

  return {
    cart: Array.isArray(cart) ? cart.filter((item) => item.quantity > 0) : [],
    cartCount: Array.isArray(cart)
      ? cart.filter((item) => item.quantity > 0).length
      : 0,
    cartTotal: Array.isArray(cart)
      ? cart
          .map(
            (item) =>
              item.quantity * (item.volume.saleInfo.retailPrice?.amount || 0)
          )
          .reduce((prev, current) => prev + current, 0)
      : 0,
    addToCart,
    removeFromCart,
  }
}
