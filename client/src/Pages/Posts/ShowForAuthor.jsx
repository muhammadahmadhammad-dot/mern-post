import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";

const ShowForAuthor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
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
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error?.response?.data);
        toast.error(error?.response?.data?.message);
        navigate("/");
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
              <CardDescription>
                Post on {moment(post.createdAt).fromNow()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.text}</p>
            </CardContent>
            <CardFooter>
                  
                <p>Likes :  <Badge>{post.likes} </Badge> <br />
                  Status :
                    {post.status ? (
                      <Badge>Active</Badge>
                    ) : (
                      <Badge variant="destructive">In Active</Badge>
                    )}
                </p> 
            </CardFooter>
          </Card>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ShowForAuthor;
