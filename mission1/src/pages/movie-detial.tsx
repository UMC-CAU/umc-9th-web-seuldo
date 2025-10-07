import { useParams } from "react-router-dom";
import { LoadingIcon } from "../components/loading-icon";
import { ErrorText } from '../components/error';
import { useMovieDetailFetch } from '../hooks/useMovieDetailFetch';

function MovieDetailPage(){
    const { movieID } = useParams() as {movieID : string};
    const {movieDetail, movieCredit, isLoading, isError} = useMovieDetailFetch(movieID)

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
            <div className='text-white relative group'>
                <img src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
                className="w-full h-[600px] object-cover"/>
                <div className='absolute bottom-0 flex flex-col text-xl
                    opacity-100 duration-300'>
                    <h1 className="text-6xl font-bold mb-10">{movieDetail.title}</h1>
                    <p>평점 : {movieDetail.vote_average}</p>
                    <p>{movieDetail.release_date.slice(0, 4)}</p>
                    <p className='mb-4'>{movieDetail.runtime}분</p>
                    <p className='leading-relaxed w-1/3 line-clamp-10'>{movieDetail.overview}</p>
                </div>
            </div>
            <div className="bg-black text-white pt-8 pb-10">
                <h2 className="text-2xl font-bold mb-6">감독/출연</h2>
                <div className="flex justify-center grid grid-cols-8 gap-6">
                    {movieCredit.cast.map((person) => (
                    <div key={person.id} className="flex flex-col items-center text-center">
                        <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <p className="font-semibold text-sm truncate w-24">{person.name}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{person.character}</p>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MovieDetailPage;