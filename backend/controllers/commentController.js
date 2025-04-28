import {addCommentSchema} from "../validations/commentValidations.js"
import commentModel from "../models/commentModel.js"

export const addComment = async (req,res) => {
     try {
        const { data, error } = addCommentSchema.safeParse(req.body);
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
        const userId = req.user.id
        const postId = req.params.id

        if(req.body.commentId){
            const comment = await commentModel.create({ user:userId, post:postId, comment:commentId,text });
        }else{
            const comment = await commentModel.create({ user:userId, post:postId, text });
        }
    
    
        return res
          .status(201)
          .send({ success: true, message: "comment created successfully.", comment });
      } catch (error) {
        console.log("comment addComment controller error : " + error);
        return res
          .status(400)
          .send({ success: false, message: `Error : ${error}` });
      }
}
export const deleteComment = async (req,res) => {
     try {
        const id = req.params.id
        const userId = req.user.id
    
        const findComment = await commentModel.findOne({_id:id});
        if(!findComment){
          return res.status(404)
          .send({ success: false, message: "Not found" });
        }
        if(userId != findComment.user.toString()){
          return res.status(400)
          .send({ success: false, message: "You are not authorized to perform this action." });
        }
    
    
        await commentModel.findOneAndDelete({_id:id, user:userId});
        return res
          .status(200)
          .send({ success: true, message: "Comment deleted successfully." });
      } catch (error) {
        console.log("Comment deleteComment controller error : " + error);
        return res
          .status(400)
          .send({ success: false, message: `Error : ${error}` });
      }
}