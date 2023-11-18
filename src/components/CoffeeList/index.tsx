import { coffeeList } from '../../utils/coffeeListImages'
import { CoffeeCard } from '../CoffeeCard'

export function CoffeeList() {
  return (
    <section className="flex flex-col items-center justify-between">
      <h1 className="text-3xl justify-start w-full mt-8 mb-14 text-zinc-800 dark:text-zinc-100">
        Nossos cafés
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 pb-8">
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
