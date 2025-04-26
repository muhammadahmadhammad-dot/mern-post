import { useState } from "react"
import { RegisterForm } from "../../components/register-form"
import { useNavigate } from "react-router-dom"
import { toast} from "react-toastify"
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate()
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
  const handelSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`,inputs,{
        headers:{
          "Content-Type":'application/json'
        }
      }).then((response)=>{
        if (response.data.success) {
          toast.success(response?.data?.message,{autoClose:2000})
          navigate('/login')
        }
      }).catch((error)=>{
        if(error?.response?.data?.validateErrors) {
          console.log(error?.response?.data?.validateErrors)
          setErrors(error?.response?.data?.validateErrors)
        }
        toast.error(error?.response?.data?.message,{autoClose:2000})
    })
}
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm errors={errors}  handelSubmit={handelSubmit} inputs={inputs} handelChange={handelChange}/>
      </div>
    </div>
  )
}
