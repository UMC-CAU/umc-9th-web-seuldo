import { useState } from 'react';
import type { Movie } from '../types/movie';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return <h1>영화 데이터 불러오기</h1>;
};

export default MoviesPage;