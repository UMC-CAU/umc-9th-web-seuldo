import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

export default function MoviesPage(){
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(import.meta.env.VITE_TMDB_KEY);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  console.log(movies[0])

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-6 gap-2">
        {movies.map((movie) => 
        <div className='relative group overflow-hidden'>
          <img key={movie.id}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            className="rounded"
          />
          <div className='absolute inset-0 flex flex-col justify-center items-center backdrop-blur-md text-white
                        opacity-0 group-hover:opacity-100 duration-300 rounded'>
            <h2 className="font-bold text-lg leading-snug">{movie.title}</h2>
            <p className='text-smline-clamp-5'>{movie.overview}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
