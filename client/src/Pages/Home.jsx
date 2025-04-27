import React, { useEffect, useState } from "react";
import moment from "moment"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {Link} from "react-router-dom"
const Home = () => {
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
                <Link to={`/show/${post._id}`}>
                <Card >
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>By {post.author?.name} on {moment(post.createdAt).fromNow()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.text}</p>
                </CardContent>
                <CardFooter>
                  <p>Likes : {post.likes}</p>
                </CardFooter>
              </Card>
                </Link>
            </div>
            ))}

         </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Home;
