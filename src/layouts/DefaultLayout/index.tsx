import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div className="mx-auto h-full min-h-screen w-full bg-zinc-100 px-4 dark:bg-zinc-900 md:px-8 lg:px-10 xl:px-32">
      <div className="mx-auto max-w-[90rem]">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
