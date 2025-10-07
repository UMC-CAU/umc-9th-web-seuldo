import google from "../assets/google.png";


const login = () => {
    return (
    <div className="flex justify-center items-center bg-black min-h-screen">
      <div className="flex flex-col w-[90%] max-w-sm items-center gap-y-3 text-white">
        <div className="relative flex items-center justify-center w-full mb-6">
          <button className="absolute left-0 cursor-pointer">&lt;</button>
          <p className="text-xl font-bold">로그인</p>
        </div>
        
        <button className="relative flex justify-center items-center px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition cursor-pointer">
          <img src={google} className="absolute left-2 w-5 h-5" />
          <p>구글 로그인</p>
        </button>

        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <input
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="이메일을 입력해주세요!"
        />
        <input
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="비밀번호를 입력해주세요!"
        />

        <button className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition cursor-pointer">
          로그인
        </button>
      </div>
    </div>)
}
export default login