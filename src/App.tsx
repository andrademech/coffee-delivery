// Context Providers
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CartProvider } from './contexts/CartContext'

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartProvider>
  )
}
