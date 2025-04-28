import z from "zod"

export const addCommentSchema = z.object({
    text:z.string().trim().min(1,'Comment is required.'),
});