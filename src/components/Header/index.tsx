import coffeeDeliveryLogo from '../../assets/coffee_delivery_logo.svg'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { useQuantity } from '../../hooks/useQuantity'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import * as Switch from '@radix-ui/react-switch'

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
      <Link to="/">
        <img src={coffeeDeliveryLogo} width={80} alt="Coffee Delivery Logo" />
      </Link>

      <div className="flex items-center gap-4">
        <div className="gap-4 flex justify-center">
          <div className="flex gap-4 h-[2.375rem] items-center justify-between">
            <div className="flex justify-between items-center p-2 h-full gap-1 bg-purple-200 rounded">
              <MapPin size={22} weight="fill" className="text-purple-600" />
              <span className="text-base text-purple-900">João Pessoa, PB</span>
            </div>
            <button className="bg-purple-100 h-full w-9 flex justify-center items-center rounded">
              {totalCartQuantity > 0 ? (
                <Link to="/checkout">
                  <ShoppingCart
                    size={24}
                    weight="fill"
                    className="text-purple-600"
                  />
                </Link>
              ) : (
                <ShoppingCart
                  size={24}
                  weight="fill"
                  className="text-purple-600"
                />
              )}
            </button>
            {totalCartQuantity > 0 && (
              <div className="flex items-center justify-center text-white text-sm w-5 h-5 -ml-6 mb-7 bg-amber-700 rounded-full">
                {totalCartQuantity}
              </div>
            )}
            <div className="flex items-center">
              <label
                className="dark:text-white text-[15px] leading-none pr-[15px]"
                htmlFor="airplane-mode"
              >
                DarkMode
              </label>
              <Switch.Root
                className="w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
                id="airplane-mode"
                style={{ WebkitTapHighlightColor: 'rgba(0,0,0)' }}
                onClick={handleDarkMode}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
