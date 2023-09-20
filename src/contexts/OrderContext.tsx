import React, { useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

interface Order {
  id: number
  cep: string
  address: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  transactionMethod: string
}

interface CreateOrderInput {
  order: Order
}

interface OrderContextType {
  orders: Order[]
  createOrder: (data: CreateOrderInput) => void
}

interface OrdersProviderProps {
  children: React.ReactNode
}

export const OrdersContext = createContext({} as OrderContextType)

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Retrieve orders from local storage when the component mounts
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
    console.log({ storedOrders })
  }, [])

  const createOrder = (data: CreateOrderInput) => {
    const { order: newOrder } = data

    setOrders(() => [newOrder])

    // Store orders in local storage whenever they change
    localStorage.setItem('orders', JSON.stringify([newOrder]))
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
