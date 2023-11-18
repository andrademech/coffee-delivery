import { useContextSelector } from 'use-context-selector'
import Success from '../../assets/success.svg'
import { OrdersContext } from '../../contexts/OrderContext'
import { Clock, MapPin, Money } from 'phosphor-react'

export function OrderConfirm() {
  const { orders } = useContextSelector(OrdersContext, (context) => ({
    orders: context.orders,
  }))

  console.log({ orders })

  return (
    <section className="mt-10 flex flex-col lg:flex-row">
      <div className="flex flex-col">
        <h1 className="mt-8 w-full justify-start text-2xl text-purple-900">
          Uhu! Pedido Confirmado
        </h1>
        <h4 className="text-purple-900">
          Agora é só aguardar que em breve você receberá seu pedido em casa
        </h4>

        <div className="mt-8 flex flex-col rounded-bl-[36px] rounded-br rounded-tl rounded-tr-[36px] bg-[#F3F2F2] px-10 py-6">
          <h3 className="text-xl text-purple-900">Detalhes do pedido</h3>

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
                      <span>
                        Entrega em
                        <strong className="text-zinc-900">{` ${address}, ${number}`}</strong>
                      </span>
                      <span className="text-zinc-900">{`${district}, ${city}, ${state}`}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock
                      size={30}
                      weight="fill"
                      className="rounded-full bg-amber-600 p-[6px] text-white"
                    />
                    <div className="flex flex-col">
                      <span className="text-zinc-900">Previsão de entrega</span>
                      <strong className="text-zinc-900">25 min - 35 min</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Money
                      size={30}
                      weight="fill"
                      className="rounded-full bg-yellow-600 p-[6px] text-white"
                    />
                    <div className="flex flex-col">
                      <span className="text-zinc-900">
                        Pagamento na entrega
                      </span>
                      <strong className="text-zinc-900">
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
        width={450}
      />
    </section>
  )
}
