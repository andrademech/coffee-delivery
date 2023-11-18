import coffeeDeliveryLogo from '../../assets/coffee_delivery_logo.svg'
import coffeeDeliveryDarkModeLogo from '../../assets/coffee_delivery_logo_dm.svg'
import { MapPin, Moon, ShoppingCart, Sun } from 'phosphor-react'
import { useQuantity } from '../../hooks/useQuantity'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function Header() {
  const { totalCartQuantity } = useQuantity()

  const [darkMode, setDarkMode] = useState<boolean>(false)

  function handleDarkMode() {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="flex h-[6.5rem] items-center justify-between">
      <Link
        to="/"
        className="rounded p-2 hover:border hover:border-purple-600 dark:bg-zinc-800 dark:hover:border dark:hover:border-purple-400"
      >
        {darkMode === false ? (
          <img
            src={coffeeDeliveryDarkModeLogo}
            width={80}
            alt="Coffee Delivery Logo"
          />
        ) : (
          <img src={coffeeDeliveryLogo} width={80} alt="Coffee Delivery Logo" />
        )}
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex justify-center gap-4">
          <div className="flex h-[2.375rem] items-center justify-between gap-4">
            <div className="flex h-full items-center justify-between gap-1 rounded bg-purple-200 p-2 dark:bg-zinc-700">
              <MapPin
                size={22}
                weight="fill"
                className="text-purple-600 dark:text-purple-300"
              />
              <span className="text-base text-purple-900 dark:text-purple-300">
                João Pessoa, PB
              </span>
            </div>
            <button className="flex h-full w-9 items-center justify-center rounded bg-purple-200 hover:border hover:border-purple-600 dark:bg-zinc-700 dark:hover:border-purple-400">
              {totalCartQuantity > 0 ? (
                <Link to="/checkout">
                  <ShoppingCart
                    size={24}
                    weight="fill"
                    className="text-purple-600 dark:text-purple-300"
                  />
                </Link>
              ) : (
                <ShoppingCart
                  size={24}
                  weight="fill"
                  className="text-purple-600 dark:text-purple-300"
                />
              )}
            </button>
            {totalCartQuantity > 0 && (
              <div className="-ml-6 mb-7 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-sm text-white">
                {totalCartQuantity}
              </div>
            )}
            <button
              className="flex h-10 w-10 items-center justify-center rounded bg-purple-200 hover:border hover:border-purple-600 dark:bg-zinc-700 dark:hover:border-purple-400"
              onClick={handleDarkMode}
            >
              {darkMode === false ? (
                <Sun
                  width={22}
                  className="dark:text-purple-300"
                  weight="fill"
                />
              ) : (
                <Moon
                  width={22}
                  className="text-purple-600 dark:text-purple-300"
                  weight="fill"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
