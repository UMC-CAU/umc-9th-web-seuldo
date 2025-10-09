import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import NotFound from './pages/not-found';
import Login from './pages/login';
import RootLayout from './layout/root-layout';
import Signup from './feature/signup/sign-up';

const router = createBrowserRouter([
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
    ]
  },

])

function App() {
  return <RouterProvider router={router} />
}

export default App