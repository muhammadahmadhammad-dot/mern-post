import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Show = () => {
      const { id } = useParams();
      const [post, setPost] = useState([]);
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
          });
      };
      useEffect(() => {
        fetchData(id);
      }, [id]);
  return (
    <Card>
          <CardHeader>
            <CardTitle>Post</CardTitle>
            <CardDescription>
              <Card>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    By {post.author?.name} on {moment(post.createdAt).fromNow()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.text}</p>
                </CardContent>
                <CardFooter>
                  <p>Likes : {post.likes}</p>
                </CardFooter>
              </Card>
            </CardDescription>
          </CardHeader>
        </Card>
  )
}

export default Show