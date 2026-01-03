import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from './redux/authSlice'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user exists in localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setAuthUser(user));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )
}

export default App

