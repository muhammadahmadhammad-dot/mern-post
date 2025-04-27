import z from "zod"

export const postCreateSchema = z.object({
    text:z.string().trim().min(1,'Description is required.'),
});