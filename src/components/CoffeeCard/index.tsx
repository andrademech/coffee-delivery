import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { priceFormatter } from '../../utils/formatter'
import { CartContext, CartItem } from '../../contexts/CartContext'
import { useContextSelector } from 'use-context-selector'
import { useEffect, useState } from 'react'

export function CoffeeCard({
  id,
  coffeeName,
  image,
  tag,
  description,
  price,
}: CartItem) {
  const [localItemQuantity, setLocalItemQuantity] = useState<number>(0)

  const { handleAddToCart, handleRemoveFromCart, cart } = useContextSelector(
    CartContext,
    (context) => ({
      handleAddToCart: context.handleAddToCart,
      handleRemoveFromCart: context.handleRemoveFromCart,
      cart: context.cart,
    }),
  )

  useEffect(() => {
    // Find the item in the cart based on its id
    const itemIndex = cart.findIndex((item) => item.cartItem.id === id)
    if (itemIndex !== -1) {
      // Update the local quantity state with the quantity from the cart
      setLocalItemQuantity(cart[itemIndex].quantity)
    } else {
      setLocalItemQuantity(0)
    }
  }, [cart, id])

  return (
    <div className="flex h-[19.375rem] w-[16rem] flex-col items-center rounded-bl-[36px] rounded-br rounded-tl rounded-tr-[36px] bg-[#F3F2F2] shadow-2xl dark:bg-zinc-800">
      <img src={image} alt={coffeeName} width={120} className="mt-[-20px]" />

      <div className="flex w-full flex-row items-center justify-center pt-3">
        {tag.map((tag) => (
          <span
            key={tag}
            className="mx-1 rounded-full bg-amber-100 px-2 py-1 text-center text-xs font-bold text-amber-900"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>
      <h2 className="pt-4 text-center text-xl font-bold">{coffeeName}</h2>

      <p className="w-3/4 pt-2 text-center text-xs">{description}</p>

      <div className="flex items-center gap-3 pt-[2.0625rem] text-xl font-bold">
        <h2>
          <strong>{priceFormatter.format(price)}</strong>
        </h2>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-3 rounded bg-[#E6E5E5] text-xl">
            <button
              onClick={() => {
                handleRemoveFromCart(id)
              }}
              className="flex w-8 items-center justify-center rounded px-1 py-2 hover:bg-purple-400"
            >
              <Minus size={18} weight="fill" className="text-purple-900" />
            </button>
            <span className="text-base">{localItemQuantity}</span>
            <button
              onClick={() => {
                handleAddToCart({
                  id,
                  coffeeName,
                  image,
                  tag,
                  description,
                  price,
                })
              }}
              className="flex w-8 items-center justify-center rounded px-1 py-2 hover:bg-purple-400"
            >
              <Plus size={18} weight="fill" className="text-purple-900" />
            </button>
          </div>
          <button className="rounded bg-purple-200 p-2 text-purple-900 hover:bg-purple-400">
            <Link to="/checkout">
              <ShoppingCart size={18} weight="fill" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
