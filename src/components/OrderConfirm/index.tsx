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
    <section className="flex flex-col mt-10 lg:flex-row">
      <div className="flex flex-col">
        <h1 className="text-2xl justify-start w-full mt-8 text-purple-900">
          Uhu! Pedido Confirmado
        </h1>
        <h4 className="text-purple-900">
          Agora é só aguardar que em breve você receberá seu pedido em casa
        </h4>

        <div className="flex flex-col px-10 py-6 rounded-tl rounded-bl-[36px] rounded-tr-[36px] rounded-br bg-[#F3F2F2] mt-8">
          <h3 className="text-xl text-purple-900">Detalhes do pedido</h3>

          <div className="flex flex-col gap-4 mt-4">
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
                  <div className="flex gap-4 items-center">
                    <MapPin
                      size={30}
                      weight="fill"
                      className="text-white bg-purple-600 rounded-full p-[4px]"
                    />
                    <div className="flex flex-col">
                      <span>
                        Entrega em
                        <strong className="text-slate-900">{` ${address}, ${number}`}</strong>
                      </span>
                      <span className="text-slate-900">{`${district}, ${city}, ${state}`}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Clock
                      size={30}
                      weight="fill"
                      className="text-white bg-amber-600 rounded-full p-[6px]"
                    />
                    <div className="flex flex-col">
                      <span className="text-slate-900">
                        Previsão de entrega
                      </span>
                      <strong className="text-slate-900">
                        25 min - 35 min
                      </strong>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Money
                      size={30}
                      weight="fill"
                      className="text-white bg-yellow-600 rounded-full p-[6px]"
                    />
                    <div className="flex flex-col">
                      <span className="text-slate-900">
                        Pagamento na entrega
                      </span>
                      <strong className="text-slate-900">
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
