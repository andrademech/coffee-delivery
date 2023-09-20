import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../contexts/CartContext'

export function useQuantity() {
  const { cart } = useContextSelector(CartContext, (context) => ({
    cart: context.cart,
  }))

  const totalCartQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  const totalCartPrice = cart.reduce((acc, item) => {
    return acc + item.cartItem.price * item.quantity
  }, 0)

  return { totalCartPrice, totalCartQuantity }
}
