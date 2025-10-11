import eyeOn from "../../assets/eye-regular-full.svg";
import eyeOff from "../../assets/eye-slash-regular-full.svg";
import type { FormFields } from "./sign-up.tsx";
import type { UseFormReturn } from "react-hook-form";
import { useState } from "react";

const PasswordForm = ({
  form,
  onNext,
  onPrev,
}: {
  form: UseFormReturn<FormFields>;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { register, watch, formState : {errors} } = form;

  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const password = watch("password");
  const confirmPw = watch("confirmPw");

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

        <p className="text-white text-bold test-left w-full gap-2 mb-2">
          ✉️ {form.getValues("email")}
        </p>

        <div className="relative w-full">
          <input
            type={isPwVisible ? "text" : "password"}
            {...register("password")}
            className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition pr-10"
            placeholder="비밀번호를 입력해주세요!"
          />
          <button
            className="cursor-pointer"
            onClick={() => setIsPwVisible(!isPwVisible)}
          >
            <img
              src={isPwVisible ? eyeOn : eyeOff}
              className="absolute right-2 top-1/2 -translate-y-[45%] w-5 h-5"
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-900">{errors.password.message}</p>
        )}

        <div className="relative w-full">
          <input
            type={isConfirmVisible ? "text" : "password"}
            {...register("confirmPw")}
            className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
            placeholder="비밀번호를 다시 한 번 입력해주세요!"
          />
          <button
            className="cursor-pointer"
            onClick={() => setIsConfirmVisible(!isConfirmVisible)}
          >
            <img
              src={isConfirmVisible ? eyeOn : eyeOff}
              className="absolute right-2 top-1/2 -translate-y-[45%] w-5 h-5"
            />
          </button>
        </div>
        {(password != confirmPw) && (confirmPw != "") && (
          <p className="text-red-900">비밀번호가 일치하지 않습니다.</p>
        )}

        <button
          disabled={!password || !confirmPw || !!errors.password || password !== confirmPw}
          className={`px-4 py-2 rounded w-full transition
            ${
              password && confirmPw && !errors.password && password === confirmPw
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

export default PasswordForm;
