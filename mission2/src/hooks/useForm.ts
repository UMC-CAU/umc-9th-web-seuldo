import { useState } from "react";

export function useForm(){
    const [email, setEmail] = useState({
        value : "",
        isError : true
    })
    const [password, setPassword] = useState({
        value : "",
        isError : true
    })

    const validateEmail = () => {
      const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
      let isError : boolean;
      if (!emailFormat.test(email.value)) {
        isError = true
      }else{
        isError = false
      }
      setEmail((prev) => ({
        ...prev,
        isError:isError
      }));
    }

    const validatePassword = () => {
      let isError : boolean;
      if (!(password.value.length>=8)) {
        isError = true
      }else{
        isError = false
      }
      setPassword((prev) => ({
        ...prev,
        isError:isError
      }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if(e.target.type === "email"){
            setEmail((prev) => ({
                ...prev,
                value:value
            }));
            validateEmail()
        }
        if(e.target.type === "password"){
            setPassword((prev) => ({
                ...prev,
                value:value
            }));
            validatePassword()
        }
    }


    return { email, password, handleChange}
}