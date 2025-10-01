import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1) 만든 페이지 import
import HomePage from './pages/home';
import NotFound from './pages/not-found';
import Movies from './pages/movies';

// 2) 라우터에 연결
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
]);

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />;
}

export default App;