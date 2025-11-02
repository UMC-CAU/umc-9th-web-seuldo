import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import NotFound from './pages/not-found';
import Login from './pages/login';
import RootLayout from './layout/root-layout';
import Signup from './feature/signup/sign-up';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/mypage';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/google-redirect';


const publicRoutes:RouteObject[] = [
  {
    path:"/",
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    children:[ 
      {
        index: true,
        element: <Home/>
      },
      {
        path:"/login",
        element: <Login/> 
      },
      {
        path:"/signup",
        element: <Signup/>
      },
      {
        path:"/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage/>
      }
    ]
  },
]

const protectedRoutes:RouteObject[] = [
  {
    path:"/",
    element: <ProtectedLayout/>,
    errorElement: <NotFound/>,
    children:[ 
      {
        path:"/my",
        element: <MyPage/>
      },
    ]
  },
]

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])


function App() {
  return (<AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>)
}
export default App