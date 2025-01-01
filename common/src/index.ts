import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

// {**************************************************************8}

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

// {**************************************************************8}

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;


// {**************************************************************8}

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;