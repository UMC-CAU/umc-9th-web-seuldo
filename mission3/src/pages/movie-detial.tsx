import { useEffect, useState, } from 'react';
import { useParams } from "react-router-dom";
import { LoadingIcon } from "../components/loading-icon";
import axios from 'axios';
import { ErrorText } from '../components/error';
import type { Detail } from '../types/detail';
import type { Credits } from '../types/credit';

function MovieDetailPage(){
    const { movieID } = useParams<{ movieID: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movieDetail, setMovieDetail] = useState<Detail|null>(null);
    const [movieCredit, setMovieCredit] = useState<Credits|null>(null);

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

    if (isLoading){
    return <LoadingIcon />;
    }
    if (isError){
    return <ErrorText/>
    }
    if (movieDetail === null || movieCredit === null){
        return <p>영화 정보를 불러올 수 없습니다.</p>
    }

    return (
        <>
            {movieDetail?.title}
            {movieDetail?.release_date}
            {movieDetail?.runtime}
        </>
    )
}

export default MovieDetailPage;