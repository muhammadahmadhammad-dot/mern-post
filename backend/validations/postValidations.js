import z from "zod"

export const postCreateSchema = z.object({
    title:z.string().trim().min(1,'Title is required.').max(255,'Maximum 255 Characters Allowed.'),
    slug:z.string().trim().min(1,'Slug is required.').max(255,'Maximum 255 Characters Allowed.'),
    shortDescription:z.string().trim().min(1,'Short Description is required.').max(255,'Maximum 255 Characters Allowed.'),
    description:z.string().trim().min(1,'Description is required.'),
    status : z.string()
        .transform((val) => val === "true").default(true),
});