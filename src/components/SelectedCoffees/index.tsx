import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../../contexts/CartContext'
import { useQuantity } from '../../hooks/useQuantity'
import { priceFormatter } from '../../utils/formatter'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '../Button'

import cx from 'classnames'
import { Trash, Minus, Plus } from 'phosphor-react'

export function SelectedCoffees() {
  const [, setItemQuantities] = useState<{
    [key: number]: number
  }>({})

  const { totalCartPrice } = useQuantity()

  const { cart, handleClearCart, handleAddToCart, handleRemoveFromCart } =
    useContextSelector(CartContext, (context) => ({
      cart: context.cart,
      handleAddToCart: context.handleAddToCart,
      handleRemoveFromCart: context.handleRemoveFromCart,
      handleClearCart: context.handleClearCart,
    }))

  const { watch } = useFormContext()

  const formData = {
    cep: watch('cep'),
    address: watch('address'),
    number: watch('number'),
    complement: watch('complement'),
    district: watch('district'),
    city: watch('city'),
    state: watch('state'),
  }

  const isSubmitDisabled =
    !formData.cep ||
    !formData.address ||
    !formData.number ||
    !formData.district ||
    !formData.city ||
    !formData.state

  useEffect(() => {
    const itemCart = cart.find((item) => item.quantity)

    if (itemCart) {
      setItemQuantities((prev) => ({
        ...prev,
        [itemCart.cartItem.id]: itemCart.quantity,
      }))
    }
  }, [cart])

  return (
    <div className="flex flex-col gap-3 min-w-[28rem] ">
      <h3 className="text-lg">Cafés selecionados</h3>
      <div className="flex flex-col p-10 rounded-tl rounded-bl-[36px] rounded-tr-[36px] rounded-br bg-[#F3F2F2]">
        <>
          {cart.map(({ cartItem, quantity }) => {
            return (
              <div key={cartItem.id} className="flex gap-4 border-b pb-4">
                <img src={cartItem.image} alt="" width={64} height={64} />
                <div className="flex flex-col">
                  <div className="flex justify-between text-base font-normal py-2">
                    <h4>{cartItem.coffeeName}</h4>
                    <span>
                      <strong>{priceFormatter.format(cartItem.price)}</strong>
                    </span>
                  </div>
                  <div className="flex gap-2 text-xl rounded items-center">
                    <div className="flex items-center rounded gap-2 bg-[#E6E5E5]">
                      <Button
                        className={cx(
                          quantity === 1 && 'hover:bg-red-600 ',
                          'flex items-center justify-center py-2 px-1 w-8 rounded hover:bg-purple-300 transition-colors group',
                        )}
                        onClick={() => handleRemoveFromCart(cartItem.id)}
                      >
                        {quantity === 1 ? (
                          <Trash
                            size={18}
                            className="text-red-700 group-hover:text-white transition-colors"
                          />
                        ) : (
                          <Minus size={18} className="text-purple-500" />
                        )}
                      </Button>
                      <span className="text-base items-center bold">
                        {quantity}
                      </span>
                      <Button
                        className="flex items-center justify-center hover:bg-purple-300 py-2 px-1 w-8 rounded"
                        onClick={() =>
                          handleAddToCart({
                            id: cartItem.id,
                            coffeeName: cartItem.coffeeName,
                            image: cartItem.image,
                            description: cartItem.description,
                            tag: cartItem.tag,
                            price: cartItem.price,
                          })
                        }
                      >
                        <Plus size={18} className="text-purple-500" />
                      </Button>
                    </div>
                    <div className="flex items-center group">
                      <Button
                        className="flex items-center justify-center rounded cursor-pointer gap-2 p-2 bg-[#E6E5E5] group-hover:bg-red-600 transition-colors"
                        onClick={() => handleClearCart(cartItem.id)}
                      >
                        <Trash
                          size={18}
                          className="text-red-700 font-bold group-hover:text-white transition-colors"
                        />
                        <span className="text-red-700 text-sm font-normal group-hover:text-white transition-colors">
                          REMOVER
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between">
              <h4 className="text-sm">Total de itens</h4>
              <span>{priceFormatter.format(totalCartPrice)}</span>
            </div>

            <div className="flex justify-between">
              <h4 className="text-sm">Entrega</h4>
              <span>{priceFormatter.format(totalCartPrice * 0.05)}</span>
            </div>

            <div className="flex justify-between mb-6">
              <h4 className="text-xl font-bold">Total</h4>
              <strong className="text-xl">
                {priceFormatter.format(totalCartPrice)}
              </strong>
            </div>
          </div>
          <button
            type="submit"
            className={cx(
              isSubmitDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600',
              'flex items-center justify-center gap-2 rounded py-2 px-4 w-full',
            )}
            disabled={isSubmitDisabled}
          >
            {isSubmitDisabled ? (
              <span className="text-white font-bold">PREENCHA OS DADOS...</span>
            ) : (
              <span className="text-white font-bold">CONFIRMAR PEDIDO</span>
            )}
          </button>
        </>
      </div>
    </div>
  )
}
