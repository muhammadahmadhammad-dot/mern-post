import postModel from "../models/postModel.js";

const increasePostView = async (post) => {
    const views = post.views + 1;
    return await postModel.findByIdAndUpdate({_id:post._id},{ views },{ new: true })
}
export default increasePostView;