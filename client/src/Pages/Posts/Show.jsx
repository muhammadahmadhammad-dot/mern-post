import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import Comment from "./Comment/Comment.jsx";

const Show = () => {
  const navigate = useNavigate();
      const { id } = useParams();
      const [post, setPost] = useState([]);
      
      useEffect(() => {
        // const abortController = new AbortController();
        // const signal = abortController.signal;
        const fetchData = (id) => {
          axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/posts/show-single/${id}`)
            .then((response) => {
              if (response.data.success) {
                setPost(response.data.post);
                console.log(response.data);
              }
            })
            .catch((error) => {
              console.log(error?.response?.data);
              toast.error(error?.response?.data?.message)
              navigate('/')
            });
        };
        fetchData(id);

        // return () =>{
        //   abortController.abort()
        // }
      }, [id,navigate]);
      return (
    <Card>
          <CardHeader>
            <CardTitle>Post</CardTitle>
            <CardDescription>
              <Card>
                <CardHeader>
                  <CardDescription>
                    By {post.author?.name} on {moment(post.createdAt).fromNow()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.text}</p>
                </CardContent>
                <CardFooter>
                  <p>Likes : {post.likes?.length || 0}</p>
                </CardFooter>
                <CardDescription>
                  <Comment postId={post._id}/>
                </CardDescription>
              </Card>
            </CardDescription>
          </CardHeader>
        </Card>
  )
}

export default Show