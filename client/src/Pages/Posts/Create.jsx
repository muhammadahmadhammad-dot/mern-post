import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CreatePostForm } from "../../components/create-post-form";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    text: "",
  });
  const [errors, setErrors] = useState({
    text: "",
  });
  const handelChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const token = JSON.parse(localStorage.getItem("token")) || null;
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/posts/create`, inputs, {
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
  return (
    <div class="w-11/12 mx-auto mt-6">
      <CreatePostForm
        errors={errors}
        handelSubmit={handelSubmit}
        inputs={inputs}
        handelChange={handelChange}
      />
    </div>
  );
};

export default Create;
