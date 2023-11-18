import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div className="mx-auto h-full w-full bg-zinc-100 px-[10rem] dark:bg-zinc-900">
      <div className="mx-auto max-w-[90rem]">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
