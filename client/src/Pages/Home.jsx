import React, { useEffect, useState } from "react";
import moment from "moment"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/posts`)
      .then((response) => {
        if (response.data.success) {
          setPosts(response.data.posts);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  };
  const addLike = async (postId) => {
    const token = JSON.parse(localStorage.getItem('token')) || false
    if(!token){
      navigate('/login')
      return;
    }
    axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/posts/update-like/${postId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (response.data.success) {
        const updatedPost = response.data.post;
        setPosts((prev) =>  prev.map((item) => (item._id == updatedPost._id ? {...item, likes : updatedPost.likes} : item) ))
        console.log(response.data)
      }
    })
    .catch((error) => {
     console.log(error?.response?.data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>
         <div className="grid grid-col-2 gap-6">
         {posts &&
            posts.map((post) => (
            <div key={post._id}>
                <Card >
                <Link to={`/show/${post._id}`}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>By {post.author?.name} on {moment(post.createdAt).fromNow()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.text}</p>
                </CardContent>
                </Link>
                <CardFooter>
                  <p><Button onClick={()=>addLike(post._id)}>Like : {post.likes?.length || 0}</Button> </p>
                </CardFooter>
              </Card>
            </div>
            ))}

         </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Home;
