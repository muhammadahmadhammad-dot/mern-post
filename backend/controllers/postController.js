
import postModel from "../models/postModel.js";
import { postCreateSchema, postUpdateSchema } from "../validations/postValidations.js";

export const index = async (req, res) => {
  try {
    // .populate('author') =>  replace the author ObjectId with the actual User document.
    // .populate('author','name') =>  replace the author ObjectId with the actual User name.
    const posts = await postModel.find({ status: true }).populate("author",'name');
    return res
      .status(200)
      .send({ success: true, message: "All posts.", posts });
  } catch (error) {
    console.log("Post Index controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const myPosts = async (req, res) => {
  try {
    const posts = await postModel.find({ author:req.user.id });
    return res
      .status(200)
      .send({ success: true, message: "All posts author wise.", posts });
  } catch (error) {
    console.log("Post myPosts controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const display = async (req, res) => {
  try {
    const post = await postModel
      .findOne({ _id: req.params.id, status: true })
      .populate("author",'name');
      if(!post){
        return res.status(404)
              .send({ success: false, message: "Not Found."});
      }
    return res
      .status(200)
      .send({ success: true, message: "Specfic post.", post });
  } catch (error) {
    console.log("Post display controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const show = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ success: true, message: "Specfic post for author.", post });
  } catch (error) {
    console.log("Post show controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const store = async (req, res) => {
  try {
    const { data, error } = postCreateSchema.safeParse(req.body);
    if (error) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Validation error!",
          validateErrors: error.format(),
        });
    }

    const { text } = data;

  

    const post = await postModel.create({ text,author:req.user.id });

    return res
      .status(201)
      .send({ success: true, message: "Post created successfully.", post });
  } catch (error) {
    console.log("Post store controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const update =async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.user.id
    const { data, error } = postUpdateSchema.safeParse(req.body);
    if (error) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Validation error!",
          validateErrors: error.format(),
        });
    }

    const { text,status } = data;
    const findPost = await postModel.findOne({_id:id});
    if(!findPost){
      return res.status(404)
      .send({ success: false, message: "Not found" });
    }
    if(userId != findPost.author.toString()){
      return res.status(400)
      .send({ success: false, message: "You are not authorized to perform this action." });
    }


    const post = await postModel.findOneAndUpdate({_id:id, author:userId},{ text,status },{ new: true });
    return res
      .status(201)
      .send({ success: true, message: "Post updated successfully.", post });
  } catch (error) {
    console.log("Post update controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const findPost = await postModel.findOne({_id:id});
    if(!findPost){
      return res.status(404)
      .send({ success: false, message: "Not found" });
    }
    if(userId != findPost.author.toString()){
      return res.status(400)
      .send({ success: false, message: "You are not authorized to perform this action." });
    }


    const post = await postModel.findOneAndDelete({_id:id, author:userId});
    return res
      .status(200)
      .send({ success: true, message: "Post deleted successfully.", post });
  } catch (error) {
    console.log("Post deletePost controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
