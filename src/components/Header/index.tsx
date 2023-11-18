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
    <div className="flex items-center h-[6.5rem] justify-between">
      <Link
        to="/"
        className="dark:bg-zinc-800 p-2 rounded hover:border dark:hover:border hover:border-purple-600 dark:hover:border-purple-400"
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
        <div className="gap-4 flex justify-center">
          <div className="flex gap-4 h-[2.375rem] items-center justify-between">
            <div className="flex justify-between items-center p-2 h-full gap-1 bg-purple-200 rounded dark:bg-zinc-700">
              <MapPin
                size={22}
                weight="fill"
                className="text-purple-600 dark:text-purple-300"
              />
              <span className="text-base text-purple-900 dark:text-purple-300">
                João Pessoa, PB
              </span>
            </div>
            <button className="bg-purple-200 dark:bg-zinc-700 h-full w-9 flex justify-center items-center rounded hover:border hover:border-purple-600 dark:hover:border-purple-400">
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
              <div className="flex items-center justify-center text-white text-sm w-5 h-5 -ml-6 mb-7 bg-amber-700 rounded-full">
                {totalCartQuantity}
              </div>
            )}
            <button
              className="flex items-center w-10 h-10 rounded justify-center dark:bg-zinc-700 bg-purple-200 hover:border hover:border-purple-600 dark:hover:border-purple-400"
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
                  className="dark:text-purple-300 text-purple-600"
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
