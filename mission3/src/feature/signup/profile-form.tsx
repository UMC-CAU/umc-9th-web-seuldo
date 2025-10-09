import { useNavigate } from "react-router-dom";
import profile from "../../assets/user-solid-full.svg";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { FormFields } from "./sign-up";
import { postSignup } from "../../apis/auth";

const ProfileForm = ({
  form,
  onNext,
  onPrev,
}: {
  form: UseFormReturn<FormFields>;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { register, handleSubmit, watch } = form;
  const navigate = useNavigate();
  const name = watch("name");

  const onSubmit : SubmitHandler<FormFields> = async (data) => {
    const {confirmPw, ...rest} = data
    const response = await postSignup(rest)
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
            onClick={() => {
              onPrev();
            }}
          >
            &lt;
          </button>
          <p className="text-xl font-bold">회원가입</p>
        </div>

        <div className="flex items-center justify-center mb-3">
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-gray-300 ">
            <img
              src={profile}
              className="w-30 h-30 rounded-full object-cover"
            />
          </div>
        </div>

        <input
          {...register("name")}
          className="px-4 py-2 rounded w-full border border-white hover:bg-white hover:text-black transition"
          placeholder="이름을 입력해주세요!"
        />

        <button
          disabled={name==""}
          className={`px-4 py-2 rounded w-full transition
            ${
              !(name=="")
                ? "bg-pink-600 text-white cursor-pointer hover:bg-pink-500 cursor-pointer"
                : "border border-white cursor-not-allowed"
            }`}
          onClick={() => {
            onNext()
          }}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
