import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div className="w-full mx-auto h-full px-[10rem] bg-zinc-100 dark:bg-zinc-900">
      <div className="max-w-[90rem] mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
