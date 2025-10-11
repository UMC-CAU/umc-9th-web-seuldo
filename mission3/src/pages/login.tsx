import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const schema = z.object({
  email : z.string().email({message: "올바른 이메일 형식을 기입해주세요."}),
  password: z.string().min(8, {
    message: "비밀번호는 8자 이상이어야 합니다."}),
})

type LoginFields = z.infer<typeof schema>;

const Login = () => {
    const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const navigate = useNavigate();
    const {register, handleSubmit, formState : {errors, isValid}} = useForm<LoginFields>({
      defaultValues : {
        email: "",
        password: ""
      },
      resolver: zodResolver(schema),
      mode: "onChange"
    })

    const onSubmit : SubmitHandler<LoginFields> = async (data) => {
      try{
        const response = await postSignin(data)
        setItem(response.data.accessToken)
        console.log(response.data.accessToken)
      } catch(error) {
        alert(error?.message)
      }
      navigate("/");
    };

    return (
    <div className="flex justify-center items-center bg-black min-h-screen">
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[90%] max-w-sm items-center gap-y-3 text-white">
        
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
          {...register("email")}
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="이메일을 입력해주세요!"
        />
        {/*태그를 특정 조건에 숨기기*/}
        {errors.email && <p className="text-red-900">{errors.email.message}</p>}
        <input
          type="password"
          {...register("password")}
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors.password && <p className="text-red-900">{errors.password.message}</p>}

        <button 
          disabled={!isValid}
          className={`px-4 py-2 rounded w-full transition
            ${isValid
              ? "bg-pink-600 text-white cursor-pointer hover:bg-pink-500 cursor-pointer"
              : "border border-white cursor-not-allowed"
            }`}>
          로그인
        </button>
      </form>
    </div>)
}
export default Login