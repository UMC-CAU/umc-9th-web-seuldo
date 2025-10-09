import google from "../../assets/google.png";
import type { FormFields } from "./sign-up.tsx";
import type { UseFormReturn } from "react-hook-form";

const EmailForm = ({
  form,
  onNext,
  onPrev,
}: {
  form: UseFormReturn<FormFields>;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { register, watch, formState : {errors} } = form;

  const email = watch("email")

  return (
    <div className="flex justify-center items-center bg-black min-h-screen">
      <div className="flex flex-col w-[90%] max-w-sm items-center gap-y-3 text-white">
        <div className="relative flex items-center justify-center w-full mb-6">
          <button
            className="absolute left-0 cursor-pointer"
            onClick={() => {
              onPrev();
            }}
          >
            &lt;
          </button>
          <p className="text-xl font-bold">회원가입</p>
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
        {errors.email && (
          <p className="text-red-900">{errors.email.message}</p>
        )}

        <button
          disabled={!email || !!errors.email}
          className={`px-4 py-2 rounded w-full transition
            ${
              (email && !errors.email)
                ? "bg-pink-600 text-white cursor-pointer hover:bg-pink-500 cursor-pointer"
                : "border border-white cursor-not-allowed"
            }`}
          onClick={() => {
            onNext();
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default EmailForm;
