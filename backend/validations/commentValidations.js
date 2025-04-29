import z from "zod"

export const addCommentSchema = z.object({
    text:z.string().trim().min(1,'Comment is required.'),
    postId:z.string().trim().min(1,'Post id is required.'),
    commentId:z.string().trim().optional().nullable(),
});