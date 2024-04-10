import { z } from "zod";

// admin schemas
export const adminLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Must enter a password." })
})