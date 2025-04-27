import { LoginForm } from "@/components/login-form"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { changeAuth, login } from "../../features/auth/authSlice";
// import { login } from "../features/auth/authSlice.js"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
      name:'',
      email:'',
      password:'',
    })
    const [errors, setErrors] = useState({
      name:'',
      email:'',
      password:'',
    })
    const handelChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs((prev)=>({...prev, [name]:value}))
    }
    const handelSubmit = (e) => {
      e.preventDefault();
      setErrors({})
      dispatch(login(inputs)).unwrap().then((response)=>{
        console.log(response)
              if (response.success) {
                toast.success(response.message,{autoClose:2000})
                dispatch(changeAuth(true))
                navigate('/')
              }else{
                if (response.validateErrors) {
                  setErrors(response.validateErrors)
                }else if (response.message && !response.validateErrors) {
                  toast.error(response.message,{autoClose:2000})
                }else{
                  toast.error("Unknown error.",{autoClose:2000})
                }
                
              }
          }).catch((error)=>{
              toast.error(error.message,{autoClose:2000})
          });
    }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm errors={errors}  handelSubmit={handelSubmit} inputs={inputs} handelChange={handelChange}/>
      </div>
    </div>
  )
}
