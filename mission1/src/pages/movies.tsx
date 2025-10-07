import { useState } from 'react';
import { LoadingIcon } from "../components/loading-icon";
import { ErrorText } from '../components/error';
import { PageNavigator } from '../components/pagination';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieFetch } from '../hooks/useMovieFetch';

export default function MoviesPage(){
  const [page, setPage] = useState(1);
  const { category } = useParams() as {category : string}
  const {movies, isLoading, isError} = useMovieFetch(category, page)
  const navigate = useNavigate();


  if (isLoading){
    return <LoadingIcon />;
  }
  if (isError){
    return <ErrorText/>
  }

  if (movies === null){
      return <p>영화 정보를 불러올 수 없습니다.</p> 
  }

  return (
    <>
      <PageNavigator page={page} setPage={setPage}/>
      <div className="flex justify-center">
        <div className="grid grid-cols-6 gap-2">
          {movies.map((movie) => 
          <div className='relative group overflow-hidden'
            onClick={() => navigate(`/movies/${category}/${movie.id}`)} >
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
    </>
  );
}
