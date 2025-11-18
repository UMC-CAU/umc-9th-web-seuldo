import { useState } from "react"
import EmailForm from "./email-form"
import PasswordForm from "./password-form"
import ProfileForm from "./profile-form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email : z.string().email({message: "올바른 이메일 형식을 기입해주세요."}),
  password: z.string().min(8, {
    message: "비밀번호는 8자 이상이어야 합니다."}),
  name: z.string(),
  confirmPw: z.string()
})

type Stage = 1|2|3
export type FormFields = z.infer<typeof schema>;

const Signup = () => {
    const form = useForm<FormFields>({
      defaultValues : {
        name: "",
        email: "",
        password: "",
        confirmPw: ""
      },
      resolver: zodResolver(schema),
      mode: "onChange"
    })

    const [stage, setStage] = useState<Stage>(1)

    const nextStage = () => {
      setStage((prev) => (prev<3 ? prev+1 as Stage : prev) )
    }

    const prevStage = () => {
      setStage((prev) => (prev>1 ? prev-1 as Stage : prev) )
    }

    const renderStage = () => {
      if(stage === 1){
        return (<EmailForm
          form={form}
          onNext={nextStage}
          onPrev={prevStage}
        />)
      }
      if(stage === 2){
        return (<PasswordForm
          form={form}
          onNext={nextStage}
          onPrev={prevStage}
        />)
      }
      if(stage === 3){
        return (<ProfileForm
          form={form}
          onNext={nextStage}
          onPrev={prevStage}
        />)
      }
    }

    return (renderStage())
}

export default Signup