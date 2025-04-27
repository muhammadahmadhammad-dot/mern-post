import axios from 'axios';

const loginUser = async (loginData) => {
    const sendingRequest = axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`,loginData,{
        headers:{
          "Content-Type":'application/json'
        }
      }).then((response)=>{
        window.localStorage.setItem("auth",JSON.stringify(response.data))
        window.localStorage.setItem("token",JSON.stringify(response.data?.token))
        return response.data
      }).catch((error)=>{
        return error.response.data
    })

    return sendingRequest
}

const authService = {loginUser}

export default authService