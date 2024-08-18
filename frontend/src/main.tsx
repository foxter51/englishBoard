import { Fragment, StrictMode } from 'react'
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthService from './services/AuthService'
import Header from './components/Header.tsx'
import AuthPage from './pages/AuthPage.tsx'

const Layout = () => {
  let currentTab = window.location.pathname.split('/')[1]
  currentTab = currentTab ? currentTab[0].toUpperCase() + currentTab.slice(1) : 'Eng Board'
  return (
    <Fragment>
      <Header currentTab={ currentTab } />
      <div className="flex h-screen w-screen justify-center">
        <div className="max-w-full max-h-full">
          <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_CLIENT_ID }>
            <Outlet />
          </GoogleOAuthProvider>
        </div>
      </div>
    </Fragment>
  )
}

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const isAuthenticated = AuthService.isAuthenticated()

  return isAuthenticated ? children : <Navigate to="/auth" />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <App /> } />
          <Route path='/auth' element={ <AuthPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
