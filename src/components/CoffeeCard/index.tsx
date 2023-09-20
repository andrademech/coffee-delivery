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
    <div className="grid grid-cols-4">
      <div className="flex w-[16rem] flex-col items-center rounded-tl rounded-bl-[36px] rounded-tr-[36px] rounded-br h-[19.375rem] bg-[#F3F2F2] shadow-2xl">
        <img src={image} alt={coffeeName} width={120} className="mt-[-20px]" />

        <div className="flex pt-3 flex-row justify-center items-center w-full">
          {tag.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold text-center rounded-full px-2 py-1 mx-1 bg-amber-100 text-amber-900"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-center pt-4">{coffeeName}</h2>

        <p className="text-xs w-3/4 text-center pt-2">{description}</p>

        <div className="flex items-center text-xl font-bold gap-3 pt-[2.0625rem]">
          <h2>
            <strong>{priceFormatter.format(price)}</strong>
          </h2>

          <div className="flex items-center gap-2 justify-center">
            <div className="flex gap-3 text-xl bg-[#E6E5E5] rounded items-center justify-center">
              <button
                onClick={() => {
                  handleRemoveFromCart(id)
                }}
                className="flex items-center justify-center hover:bg-purple-400 py-2 px-1 w-8 rounded"
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
                className="flex items-center justify-center hover:bg-purple-400 py-2 px-1 w-8 rounded"
              >
                <Plus size={18} weight="fill" className="text-purple-900" />
              </button>
            </div>
            <button className="bg-purple-200 hover:bg-purple-400 text-purple-900 rounded p-2">
              <Link to="/checkout">
                <ShoppingCart size={18} weight="fill" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
