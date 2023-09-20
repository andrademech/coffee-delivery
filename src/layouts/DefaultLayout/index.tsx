import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div className="max-w-[90rem] mx-auto px-[10rem] bg-zinc-100 dark:bg-zinc-900">
      <Header />
      <Outlet />
    </div>
  )
}
