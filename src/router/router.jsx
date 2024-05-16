import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout from '@/layouts/default-layout/DefaultLayout'
import SignupPhoneNumberView from '@/views/authentication/signup/signup-phone-number/SignupPhoneNumberView'
import SignupOtpView from '@/views/authentication/signup/signup-otp/SignupOtpView'
import SignupUserInfoView from '@/views/authentication/signup/signup-user-info/SignupUserInfoView'
import SignupRoot from '@/views/authentication/signup/signup-root/SignupRoot'
import LoginView from '@/views/authentication/login/LoginView'
import ForgotPasswordView from '@/views/authentication/forgot-password/ForgotPasswordView'
import HomeView from '@/views/panel/home-view/HomeView'
import MessagesView from '@/views/panel/messages/MessagesView'
import ProfileView from '@/views/panel/profile/ProfileView'
import ScheduleView from '@/views/panel/schedules/ScheduleView'
import TopDoctorsView from '@/views/panel/doctors/top-doctors/TopDoctorsView'
import DoctorView from '@/views/panel/doctors/doctor/DoctorView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        element: <SignupRoot />,
        path: 'signup',
        children: [
          {
            path: '',
            element: <SignupPhoneNumberView />
          },
          {
            path: 'otp',
            element: <SignupOtpView />
          },
          {
            path: 'user-info',
            element: <SignupUserInfoView />
          }
        ]
      },
      {
        path: 'login',
        element: <LoginView />
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordView />
      },
      {
        path: '',
        element: <HomeView />
      },
      {
        path: '/messages',
        element: <MessagesView />
      },
      {
        path: '/schedule',
        element: <ScheduleView />
      },
      {
        path: '/profile',
        element: <ProfileView />
      },
      {
        path: '/top-doctors',
        element: <TopDoctorsView />
      },
      {
        path: '/doctor/:doctorId',
        element: <DoctorView />
      }
    ]
  }
])

export default router
