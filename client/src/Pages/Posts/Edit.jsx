
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PostForm } from "../../components/post-form";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
   const navigate = useNavigate();
   const [post, setPost] = useState({});
    const [inputs, setInputs] = useState({
      text: '',
      status: false,
    });
    const [errors, setErrors] = useState({
      text: "",
      status:"",
    });
    const handelChange = (e) => {
      const name = e.target.name;
      let value = e.target.value;

      if (name === "status") {
        value = value === "true";
      }

      setInputs((prev) => ({ ...prev, [name]: value }));
    };
    const handelSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const token = JSON.parse(localStorage.getItem("token")) || null;
        axios
          .put(`${import.meta.env.VITE_API_BASE_URL}/posts/update/${id}`, inputs, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              toast.success(response?.data?.message, { autoClose: 2000 });
              navigate("/my-posts");
            }
          })
          .catch((error) => {
            if (error?.response?.data?.validateErrors) {
              console.log(error?.response?.data?.validateErrors);
              setErrors(error?.response?.data?.validateErrors);
            }
            toast.error(error?.response?.data?.message, { autoClose: 2000 });
          });
      };
  const fetchData = (id) => {
    const token = JSON.parse(localStorage.getItem('token')) || null
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/posts/show/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.data.success) {
          setPost(response.data.post);
          setInputs({text:response.data.post.text,status:response.data.post.status })
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);
  return (
       <div class="w-11/12 mx-auto mt-6">
           <PostForm
           edit={true}
             errors={errors}
             handelSubmit={handelSubmit}
             inputs={inputs}
             handelChange={handelChange}
           />
         </div>
  )
}

export default Edit