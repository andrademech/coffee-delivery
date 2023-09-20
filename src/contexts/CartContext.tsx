import { createContext } from 'use-context-selector'

import { useEffect, useState } from 'react'

export type CartItem = {
  id: number
  coffeeName: string
  image: string
  tag: string[]
  description: string
  price: number
}

export interface ICartProps {
  cartItem: CartItem
  quantity: number
}

interface CartContextData {
  cart: ICartProps[]
  handleAddToCart: (item: CartItem) => void
  handleRemoveFromCart: (id: number) => void
  handleClearCart: (id: number) => void
  itemQuantity: number
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>
}

export const CartContext = createContext({} as CartContextData)

interface CartProviderProps {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ICartProps[]>([])
  const [itemQuantity, setItemQuantity] = useState<number>(0)

  useEffect(() => {
    // Retrieve cart data from local storage when the component mounts
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }

    // Retrieve item quantity from local storage when the component mounts
    const storedItemQuantity = localStorage.getItem('itemQuantity')
    if (storedItemQuantity) {
      setItemQuantity(Number(storedItemQuantity))
    }
  }, [])

  function handleAddToCart({
    id,
    coffeeName,
    image,
    tag,
    description,
    price,
  }: CartItem) {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.cartItem.id === id)

      if (itemIndex !== -1) {
        // If the item is already in the cart, update its quantity
        const updatedCart = [...prevCart]
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + 1,
        }

        // Update the itemQuantity state for the current item
        setItemQuantity(updatedCart[itemIndex].quantity)

        return updatedCart
      } else {
        // If the item is not in the cart, add it with quantity 1
        const newItem = {
          cartItem: {
            id,
            coffeeName,
            image,
            tag,
            description,
            price,
          },
          quantity: 1,
        }

        // Update the itemQuantity state for the current item
        setItemQuantity(1)

        return [...prevCart, newItem]
      }
    })
  }

  function handleRemoveFromCart(id: number) {
    setCart((prevCart) => {
      const updatedCart = []

      for (const item of prevCart) {
        if (item.cartItem.id === id) {
          if (item.quantity > 1) {
            updatedCart.push({
              ...item,
              quantity: item.quantity - 1,
            })
          }
        } else {
          updatedCart.push(item)
        }
      }

      // Find the updated item quantity
      const itemIndex = updatedCart.findIndex((item) => item.cartItem.id === id)
      const updatedQuantity =
        itemIndex !== -1 ? updatedCart[itemIndex].quantity : 0

      // Update the itemQuantity state for the current item
      setItemQuantity(updatedQuantity)

      return updatedCart
    })
  }

  function handleClearCart(id: number) {
    // removing respective item from cart

    setCart((prevCart) => {
      const updatedCart = []

      for (const item of prevCart) {
        if (item.cartItem.id !== id) {
          updatedCart.push(item)
        }
      }

      // Find the updated item quantity
      const itemIndex = updatedCart.findIndex((item) => item.cartItem.id === id)
      const updatedQuantity =
        itemIndex !== -1 ? updatedCart[itemIndex].quantity : 0

      // Update the itemQuantity state for the current item
      setItemQuantity(updatedQuantity)

      return updatedCart
    })
  }

  useEffect(() => {
    // Store cart data in local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart))

    // Store item quantity in local storage whenever it changes
    localStorage.setItem('itemQuantity', String(itemQuantity))
  }, [cart, itemQuantity])

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearCart,
        itemQuantity,
        setItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
