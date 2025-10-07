import { useEffect, useState, } from 'react';
import axios from 'axios';
import type { Detail } from '../types/detail';
import type { Credits } from '../types/credit';

export function useMovieDetailFetch(movieID : string) {
  const [movieDetail, setMovieDetail] = useState<Detail|null>(null);
  const [movieCredit, setMovieCredit] = useState<Credits|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

    useEffect(() => {
      const fetchMovies = async () => {
        try{
        setIsLoading(true)
        const { data: detailData } = await axios.get<Detail>(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovieDetail(detailData);

        const { data: creditData } = await axios.get<Credits>(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        )
        setMovieCredit(creditData);
        
        }catch(e){
          console.log(e)
          setIsError(true)
        }finally{
          setIsLoading(false)
        }
      }
      fetchMovies()
    }, [movieID]);

  return {movieDetail, movieCredit, isLoading, isError}

}
