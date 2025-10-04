import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import { LoadingIcon } from "../components/loading-icon";
import axios from 'axios';
import { ErrorText } from '../components/error';

export default function MoviesPage(){
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(import.meta.env.VITE_TMDB_KEY);

  useEffect(() => {
      const fetchMovies = async () => {
        try{
        setIsLoading(true)
        const { data } = await axios.get<MovieResponse>(
          'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
        }catch{
          setIsError(true)
        }finally{
          setIsLoading(false)
        }
      }
      fetchMovies()
  }, []);

  if (isLoading){
    return <LoadingIcon />;
  }
  if (isError){
    return <ErrorText/>
  }

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
            <p className='text-sm line-clamp-5'>{movie.overview}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
