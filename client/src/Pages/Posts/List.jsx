import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {Link} from "react-router-dom"
import axios from "axios";
const List = () => {
  const [posts, setPosts] = useState([]);
  const fetchData = () => {
    const token = JSON.parse(localStorage.getItem("token")) || null;
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/posts/my-posts`,
        {headers:{
          Authorization: `Bearer ${token}`,
        }}
      )
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
    <div class="w-11/12 mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="grid grid-cols-2 ">
              <div>All Posts</div>
              <div className="flex justify-end">
                <Link to={'/my-posts/create'}>
                <Button variant="outline" size="sm">
                  Create
                </Button>
                </Link>
               
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Text</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell  className="font-medium w-2/3">{post.text}</TableCell>
                  <TableCell>
                    {post.status ? (
                      <Badge>Active</Badge>
                    ) : (
                      <Badge variant="destructive">In Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.views}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button>Action</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default List;
