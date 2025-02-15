import { Footer } from '@components/organisms/Footer/mobile'
import { Sidebar } from '@components/organisms/Sidebar'
import { Header } from '@organisms/Header/mobile'
import { Outlet } from '@tanstack/react-router'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  )
}
