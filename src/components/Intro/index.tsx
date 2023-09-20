// Styles, Logo & Icons
import coffeeDeliveryHome from '../../assets/coffee_delivery_home.svg'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'

export function Intro() {
  return (
    <div className="grid grid-cols-2 mt-[5.75rem] mb-[6.25rem] gap-14">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl text-slate-800">
          Encontre o café perfeito <br /> para qualquer hora do dia
        </h1>
        <p className="text-slate-800">
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </p>

        <div className="grid xl:grid-cols-2 gap-y-5 mt-16 sgrid-cols-1">
          <div className="flex w-[14.4375rem] items-center gap-3">
            <div className="flex items-center justify-center bg-amber-600 w-8 h-8 rounded-full">
              <ShoppingCart size={16} weight="fill" className="text-white" />
            </div>
            <span>Compra simples e segura</span>
          </div>

          <div className="flex w-[18.375rem] items-center gap-3">
            <div className="flex items-center justify-center bg-gray-600 w-8 h-8 rounded-full">
              <Package size={16} weight="fill" className="text-white" />
            </div>
            <span>Embalagem mantém o café intacto</span>
          </div>

          <div className="flex w-[14.4375rem] items-center gap-3">
            <div className="flex items-center justify-center bg-yellow-500 w-8 h-8 rounded-full">
              <Timer size={16} weight="fill" className="text-white" />
            </div>
            <span>Entrega rápida e rastreada</span>
          </div>

          <div className="flex w-[18.375rem] items-center gap-3">
            <div className="flex items-center justify-center bg-purple-500 w-8 h-8 rounded-full">
              <Coffee size={16} weight="fill" className="text-white" />
            </div>
            <span>O café chega fresquinho até você</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <img src={coffeeDeliveryHome} width={450} alt="Coffee image" />
      </div>
    </div>
  )
}
