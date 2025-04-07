import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Lazy load all pages and components
const Landing = lazy(() => import('./PAges/Landing'))
const Signup = lazy(() => import('./PAges/Signup'))
const Login = lazy(() => import('./PAges/Login'))
const ConfirmationMail = lazy(() => import('./PAges/ConfirmationMail'))
const ForgotPassword = lazy(() => import('./PAges/ForgotPassword'))
const Dashboard = lazy(() => import('./PAges/DashBoard'))
const CreatePost = lazy(() => import('./PAges/CreatePost'))
const AboutUs = lazy(() => import('./PAges/AboutUs'))
const HelpSupport = lazy(() => import('./PAges/HelpSupport'))
const Homepage = lazy(() => import('./PAges/Homepage'))
const ContactUs = lazy(() => import('./PAges/ContactUs'))
const MyPosts = lazy(() => import('./Components/MyPosts'))
const ReadMore = lazy(() => import('./PAges/ReadMore'))
const Profile = lazy(() => import('./Components/Profile'))

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/signup", element: <Signup /> },
  { path: "/confirmationMail", element: <ConfirmationMail /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/myPosts", element: <MyPosts /> },
  { path: "/createpost", element: <CreatePost /> },
  { path: "/post", element: <Homepage /> },
  { path: "/contactUs", element: <ContactUs /> },
  { path: "/post/:id", element: <ReadMore /> },
  { path: "/aboutUs", element: <AboutUs /> },
  { path: "/help", element: <HelpSupport /> },
  { path: "/profile", element: <Profile /> },
])

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="dark"
      />
      
      <Suspense fallback={
        <div className="text-white text-center mt-20 text-xl animate-pulse">
          Loading...
        </div>
      }>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
