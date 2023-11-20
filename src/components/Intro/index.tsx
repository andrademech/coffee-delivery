// Styles, Logo & Icons
import coffeeDeliveryHome from '../../assets/coffee_delivery_home.svg'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'

export function Intro() {
  return (
    <div className="mb-12 grid gap-14 md:mb-[6.25rem] md:mt-[5.75rem] md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-zinc-800 dark:text-zinc-100 sm:text-4xl md:text-5xl">
          Encontre o café perfeito <br /> para qualquer hora do dia
        </h1>
        <p className="text-zinc-800 dark:text-zinc-100">
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </p>

        <div className="mt-16 grid gap-y-5 xl:grid-cols-2">
          <div className="flex w-[14.4375rem] items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 dark:bg-amber-400">
              <ShoppingCart
                size={16}
                weight="fill"
                className="text-white dark:text-zinc-800"
              />
            </div>
            <span className="dark:text-purple-100">
              Compra simples e segura
            </span>
          </div>

          <div className="flex w-[18.375rem] items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-600 dark:bg-zinc-300">
              <Package
                size={16}
                weight="fill"
                className="text-white dark:text-zinc-800"
              />
            </div>
            <span className="dark:text-purple-100">
              Embalagem mantém o café intacto
            </span>
          </div>

          <div className="flex w-[14.4375rem] items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 dark:bg-yellow-200">
              <Timer
                size={16}
                weight="fill"
                className="text-white dark:text-zinc-800"
              />
            </div>
            <span className="dark:text-purple-100">
              Entrega rápida e rastreada
            </span>
          </div>

          <div className="flex w-[18.375rem] items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 dark:bg-purple-300">
              <Coffee
                size={16}
                weight="fill"
                className="text-white dark:text-zinc-800"
              />
            </div>
            <span className="dark:text-purple-100">
              O café chega fresquinho até você
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <img src={coffeeDeliveryHome} alt="Coffee image" className="w-96" />
      </div>
    </div>
  )
}
