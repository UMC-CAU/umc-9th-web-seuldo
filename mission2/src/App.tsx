import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import NotFound from './pages/not-found';
import Login from './pages/login';
import RootLayout from './layout/root-layout';

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
        element: <Login/>,
        errorElement: <NotFound/>
      }
    ]
  },

])

function App() {
  return <RouterProvider router={router} />
}

export default App