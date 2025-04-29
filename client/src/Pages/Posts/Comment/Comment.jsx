import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Comment = ({ postId = null }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({
    text: "",
    postId: "",
  });
  const [errors, setErrors] = useState({
    text: "",
  });
  const handelChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handelReplyChange = (e, commentId) => {
    const value = e.target.value;
    setReplyInputs((prev) => ({ ...prev, [commentId]: value }));
  };
  const handelSubmit = async (e, id = "") => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }

    const payload = {
      ...inputs,
      postId,
      text: id ? replyInputs[id] : inputs.text,
      commentId: id || null,
    };

    setErrors({});
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/comments/add`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInputs({});
        if (response.data.success) {
          const newComment = response.data.comment;

          if (newComment.comment) {
            setReplyComments((prev) => [...prev, newComment]);
            setReplyInputs((prev) => ({ ...prev, [id]: "" }));
          } else {
            setComments((prev) => [...prev, newComment]);
            setInputs((prev) => ({ ...prev, text: "" }));
          }
        }
      })
      .catch((error) => {
        setInputs({});
        if (error?.response?.data?.validateErrors) {
          setErrors(error?.response?.data?.validateErrors);
        }
        console.log(error?.response?.data);
      });
  };
  const fetchComments = (postId) => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/comments/${postId}`)
      .then((response) => {
        if (response.data.success) {
          const fetchedComments = response.data?.comments || [];

          const replies = fetchedComments.filter((c) => c.comment != null);
          const topLevel = fetchedComments.filter((c) => c.comment == null);
          console.log(replies);
          console.log(topLevel);
          setReplyComments(replies);
          setComments(topLevel);
        }
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  };
  const deleteComment = async (comment, type) => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/comments/delete/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          if (type == "comment") {
            setComments((prev) =>
              prev.filter((item) => item._id != comment._id)
            );
          } else {
            setReplyComments((prev) =>
              prev.filter((item) => item._id != comment._id)
            );
          }
          toast.success(response.data.message);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  };
  useEffect(() => {
    fetchComments(postId);
    setInputs((prev) => ({ ...prev, postId }));
    const token = JSON.parse(localStorage.getItem("token")) || null;
    setToken(token);
    const user = JSON.parse(localStorage.getItem("auth")) || null;
    setUser(user?.user);
  }, [postId]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handelSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Text">Comment</Label>
              <Textarea
                placeholder="Enter Your Comment."
                required
                name="text"
                value={inputs.text}
                onChange={handelChange}
              />

              {errors?.text && (
                <p className="text-red-500">{errors?.text._errors[0]}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Comment
            </Button>
          </div>
        </form>
      </CardContent>
      {comments &&
        comments.map((comment) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                <div className="grid grid-col-2 gap-6">
                  <div>
                    Posted by {comment.user?.name} on{" "}
                    {moment(comment.createdAt).fromNow()}
                  </div>
                  { user._id == comment?.user?._id ? (
                    <div>
                      <Button
                        variant="destructive"
                        onClick={() => deleteComment(comment, "comment")}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : ''}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{comment.text}</p>
            </CardContent>
            <CardDescription>
              <form onSubmit={(e) => handelSubmit(e, comment._id)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="Text">Reply Comment</Label>
                    <Textarea
                      placeholder="Enter Your Comment."
                      required
                      name="text"
                      value={replyInputs[comment._id] || ""}
                      onChange={(e) => handelReplyChange(e, comment._id)}
                    />

                    {errors?.text && (
                      <p className="text-red-500">{errors?.text._errors[0]}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Reply Comment
                  </Button>
                </div>
              </form>
            </CardDescription>
            {replyComments
              .filter((reply) => reply.comment === comment._id)
              .map((reply) => (
                <CardDescription>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      <div className="grid grid-col-2 gap-6">
                        <div>
                          Posted by {reply.user?.name} on{" "}
                          {moment(reply.createdAt).fromNow()}
                        </div>
                        {user._id == reply?.user?._id ? (
                          <div>
                            <Button
                              variant="destructive"
                              onClick={() => deleteComment(reply, "reply")}
                            >
                              Delete
                            </Button>
                          </div>
                        ) : ''}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{reply.text}</p>
                  </CardContent>
                </CardDescription>
              ))}
          </Card>
        ))}
    </Card>
  );
};

export default Comment;
