import z from "zod"

export const loginSchema = z.object({
    email:z.string().trim().email(),
    password:z.string().trim().min(1,'Password is required.'),
});
export const registerSchema = z.object({
    name:z.string().trim().min(1,'Name is required.').max(255,'Maximum 255 Characters allowed.'),
    email:z.string().trim().email(),
    password:z.string().trim().min(1,'Password is required.'),
});