import style from './index.module.scss'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'

import TheHeader from '@/components/view-components/single-instance/the-header/TheHeader'
import TheNavBar from '@/components/view-components/single-instance/the-navbar/TheNavBar'

import useRouteTitle from '@/hooks/useRouteTitle'
import useNavbar from '@/hooks/useNavbar'

function DefaultLayout() {
  const location = useLocation()
  const title = useRouteTitle(location.pathname)
  const hasNavbar = useNavbar(location.pathname)

  return (
    <div className={style['default-layout']}>
      <TheHeader title={title} prependIcon="ArrowLeft" />
      <main className={style['default-layout__main']}>
        <Outlet />
      </main>
      {hasNavbar && <TheNavBar />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  )
}

export default DefaultLayout
