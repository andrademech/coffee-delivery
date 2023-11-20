import { useContextSelector } from 'use-context-selector'
import Success from '../../assets/success.svg'
import { CartContext } from '../../contexts/CartContext'
import { Clock, MapPin, Money } from 'phosphor-react'

export function OrderConfirm() {
  const { orders } = useContextSelector(CartContext, (context) => ({
    orders: context.orders,
  }))

  console.log({ orders })

  return (
    <section className="mx-auto mt-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-16">
      <div className="flex flex-col">
        <h1 className="mt-8 w-full justify-start text-2xl text-purple-900 dark:text-amber-700">
          Uhu! Pedido Confirmado
        </h1>
        <h4 className="text-purple-900 dark:text-zinc-300">
          Agora é só aguardar que em breve você receberá seu pedido em casa
        </h4>

        <div className="mt-8 flex flex-col rounded-bl-[36px] rounded-br rounded-tl rounded-tr-[36px] bg-[#F3F2F2] px-10 py-6 dark:bg-zinc-700">
          <h3 className="text-xl text-purple-900 dark:text-amber-700">
            Detalhes do pedido
          </h3>

          <div className="mt-4 flex flex-col gap-4">
            {orders.map(
              ({
                id,
                address,
                number,
                district,
                city,
                state,
                transactionMethod,
              }) => (
                <div className="flex flex-col gap-6" key={id}>
                  <div className="flex items-center gap-4">
                    <MapPin
                      size={30}
                      weight="fill"
                      className="rounded-full bg-purple-600 p-[4px] text-white"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold dark:text-amber-700">
                        Entrega em
                        <strong className="text-zinc-900 dark:text-zinc-300">{` ${address}, ${number}`}</strong>
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-300">{`${district}, ${city}, ${state}`}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock
                      size={30}
                      weight="fill"
                      className="rounded-full bg-amber-600 p-[6px] text-white"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900 dark:text-amber-700">
                        Previsão de entrega
                      </span>
                      <strong className="text-zinc-900 dark:text-zinc-300">
                        25 min - 35 min
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Money
                      size={30}
                      weight="fill"
                      className="rounded-full bg-yellow-600 p-[6px] text-white"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900 dark:text-amber-700">
                        Pagamento na entrega
                      </span>
                      <strong className="text-zinc-900 dark:text-zinc-300">
                        {transactionMethod === 'pix' ? 'Dinheiro' : 'Cartão'}
                      </strong>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <img
        src={Success}
        alt="Imagem de motociclista entregando encomenda"
        className="h-96 w-96 rounded-bl-[36px] rounded-br rounded-tl rounded-tr-[36px] dark:bg-zinc-600"
      />
    </section>
  )
}
