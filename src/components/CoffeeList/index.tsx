import { coffeeList } from '../../utils/coffeeListImages'
import { CoffeeCard } from '../CoffeeCard'

export function CoffeeList() {
  return (
    <section className="flex flex-col items-center justify-between">
      <h1 className="mb-14 mt-4 w-full justify-start text-3xl text-zinc-800 dark:text-zinc-100 sm:mt-8">
        Nossos cafés
      </h1>

      <div className="xs:gap-11 grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 sm:gap-24 lg:grid-cols-3">
        {coffeeList.map(
          ({ id, coffeeName, description, image, price, tag }) => {
            return (
              <CoffeeCard
                key={id}
                id={id}
                coffeeName={coffeeName}
                description={description}
                image={image}
                tag={tag}
                price={price}
              />
            )
          },
        )}
      </div>
    </section>
  )
}
