import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

export function useMovieFetch(category:string, page:number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
      const fetchMovies = async () => {
        try{
        setIsLoading(true)
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
        }catch(e){
          console.log(e)
          setIsError(true)
        }finally{
          setIsLoading(false)
        }
      }
      fetchMovies()
  }, [page, category]);

  return {movies, isLoading, isError}

}
