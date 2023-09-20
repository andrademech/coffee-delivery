// Context Providers
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CartProvider } from './contexts/CartContext'
import { OrdersProvider } from './contexts/OrderContext'

export function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </OrdersProvider>
    </CartProvider>
  )
}
