import z from "zod"

export const postCreateSchema = z.object({
    text:z.string().trim().min(1,'Text is required.'),
});
export const postUpdateSchema = z.object({
    text:z.string().trim().min(1,'Text is required.'),
    status : z.boolean()
});