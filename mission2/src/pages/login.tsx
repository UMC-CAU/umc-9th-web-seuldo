import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const navigate = useNavigate();
    const { email, password, handleChange} = useForm()

    return (
    <div className="flex justify-center items-center bg-black min-h-screen">
      <div className="flex flex-col w-[90%] max-w-sm items-center gap-y-3 text-white">
        
        <div className="relative flex items-center justify-center w-full mb-6">
          <button 
            className="absolute left-0 cursor-pointer"
            onClick={() => navigate("/")}
          >&lt;</button>
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
          type="email"
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="이메일을 입력해주세요!"
          onChange={handleChange}
        />
        {/*태그를 특정 조건에 숨기기*/}
        {email.isError && email.value!="" && <p className="text-red-900">올바른 이메일 형식을 기입해주세요.</p>}
        <input
          type="password"
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="비밀번호를 입력해주세요!"
          onChange={handleChange}
        />
        {password.isError && password.value!="" && <p className="text-red-900">비밀번호는 8자 이상입니다.</p>}

        <button 
          disabled={!(!email.isError&&!password.isError)}
          className={`px-4 py-2 rounded w-full transition
            ${(!email.isError&&!password.isError)
              ? "bg-pink-600 text-white cursor-pointer hover:bg-pink-500 cursor-pointer"
              : "border border-white cursor-not-allowed"
            }`}>
          로그인
        </button>
      </div>
    </div>)
}
export default Login