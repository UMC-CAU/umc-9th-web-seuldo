
type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PageNavigator = ({ page, setPage }: Props) => {
    const nextPage = () =>{
        setPage(page+1)
    }

    const lastPage = () =>{
        setPage(page-1)
    }

    return (
        <div className="flex justify-center gap-4 items-center my-6">
            <button onClick={lastPage} 
                className ='bg-green-200 text-white rounded shadow-md w-10 h-8
                hover:bg-green-700 duration-300 
                disabled:bg-gray-300 disabled:cursor-not-allowed'
                disabled={page == 1}
            >{"<"}</button>
            <p> {page}페이지 </p>
            <button onClick={nextPage} 
                className ='bg-green-200 text-white rounded shadow-md w-10 h-8
                hover:bg-green-700 duration-300 
                disabled:bg-gray-300 disabled:cursor-not-allowed'
            >{">"}</button>
        </div>
    )
}