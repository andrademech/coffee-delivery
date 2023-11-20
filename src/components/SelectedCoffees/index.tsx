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
    <div className="mt-4 flex w-full max-w-[30rem] flex-col gap-3 ">
      <h3 className="text-lg dark:text-purple-100">Cafés selecionados</h3>
      <div className="flex flex-col rounded-bl-[36px] rounded-br rounded-tl rounded-tr-[36px] bg-[#F3F2F2] p-4 dark:bg-zinc-800 dark:text-zinc-300 sm:p-8 md:p-10">
        <>
          {cart.map(({ cartItem, quantity }) => {
            return (
              <div key={cartItem.id} className="flex gap-4 border-b pb-4">
                <img src={cartItem.image} alt="" width={64} height={64} />
                <div className="flex w-full flex-col">
                  <div className="flex justify-between py-2 text-base font-normal">
                    <h4 className="text-sm font-bold md:text-sm">
                      {cartItem.coffeeName}
                    </h4>
                    <span>
                      <strong>{priceFormatter.format(cartItem.price)}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded text-xl">
                    <div className="flex items-center gap-2 rounded bg-[#E6E5E5] dark:bg-zinc-100">
                      <Button
                        className={cx(
                          quantity === 1 && 'hover:bg-red-600 ',
                          'group flex w-8 items-center justify-center rounded px-1 py-2 transition-colors hover:bg-purple-300',
                        )}
                        onClick={() => handleRemoveFromCart(cartItem.id)}
                      >
                        {quantity === 1 ? (
                          <Trash
                            size={18}
                            className="text-red-700 transition-colors group-hover:text-white"
                          />
                        ) : (
                          <Minus
                            size={18}
                            className="text-purple-500 dark:text-purple-950"
                          />
                        )}
                      </Button>
                      <span className="bold items-center text-base dark:text-purple-950">
                        {quantity}
                      </span>
                      <Button
                        className="flex w-8 items-center justify-center rounded px-1 py-2 hover:bg-purple-300"
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
                        <Plus
                          size={18}
                          className="text-purple-500 dark:text-purple-950"
                        />
                      </Button>
                    </div>
                    <div className="group hidden items-center xs:inline">
                      <Button
                        className="flex cursor-pointer items-center justify-center gap-2 rounded bg-[#E6E5E5] p-2 transition-colors group-hover:bg-red-600 dark:bg-zinc-100"
                        onClick={() => handleClearCart(cartItem.id)}
                      >
                        <Trash
                          size={18}
                          className="font-bold text-red-700 transition-colors group-hover:text-white"
                        />
                        <span className="text-sm font-normal text-red-700 transition-colors group-hover:text-white">
                          REMOVER
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <h4 className="text-sm md:text-sm">Total de itens</h4>
              <span>{priceFormatter.format(totalCartPrice)}</span>
            </div>

            <div className="flex justify-between">
              <h4 className="text-sm md:text-sm">Entrega</h4>
              <span>{priceFormatter.format(totalCartPrice * 0.05)}</span>
            </div>

            <div className="mb-6 flex justify-between">
              <h4 className="text-lg font-bold md:text-xl">Total</h4>
              <strong className="text-lg font-bold md:text-xl">
                {priceFormatter.format(totalCartPrice)}
              </strong>
            </div>
          </div>
          <button
            type="submit"
            className={cx(
              isSubmitDisabled
                ? 'cursor-not-allowed bg-zinc-400'
                : 'bg-purple-500 hover:bg-purple-600',
              'flex w-full items-center justify-center gap-2 rounded px-4 py-2',
            )}
            disabled={isSubmitDisabled}
          >
            {isSubmitDisabled ? (
              <span className="font-bold text-white">
                Ops... Observe o formulário
              </span>
            ) : (
              <span className="font-bold text-white">
                Yeah! Confirmar pedido 🔥
              </span>
            )}
          </button>
        </>
      </div>
    </div>
  )
}
