import { z } from "zod";

// admin schemas
export const adminLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Must enter a password." })
});

// all-voter route
export const createVoterAccountSchema = z.object({
    classification: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a voter classification."
    }),
    fullName: z.string().min(1, { message: "Must enter a valid full name." }),
    voterLrn: z.string().min(11, { message: "Must enter a valid voter lrn." }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Must choose a strong password." }),
    confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });
    }
});

export const migrationDataSchema = z.object({
    classification: z.string().min(1, { message: "Must choose classification." }),
    migrationData: z.string().min(1, { message: "Must upload a migration file." }),
});

export const updateVoterAccountSchema = z.object({
    userId: z.string(),
    voterId: z.string(),
    classification: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a voter classification."
    }),
    fullName: z.string().min(1, { message: "Must enter a valid full name." }),
    voterLrn: z.string().min(11, { message: "Must enter a valid voter lrn." }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Must choose a strong password." }),
    confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });
    }
});

// positions route
export const createPositionSchema = z.object({
    positionName: z.string().min(3, { message: "Must enter a valid position name." })
})