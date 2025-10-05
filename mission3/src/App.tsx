import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './pages/not-found';
import Movies from './pages/movies';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home';
import MovieDetailPage from './pages/movie-detial';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'movies/:category',
        element: <Movies/>
      },
      {
        path: 'movies/:category/:movieID',
        element: <MovieDetailPage/>
      }
    ]
  }
]);

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />;
}

export default App;