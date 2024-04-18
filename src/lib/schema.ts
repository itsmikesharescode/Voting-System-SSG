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
    maximumVotes: z.string().refine(val => Number(val) > 0, { message: "Maximum votes must greater than 0." }),
    classification: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a position classification."
    }),
    positionName: z.string().min(3, { message: "Must enter a valid position name." })
});

export const updatePositionSchema = z.object({
    maximumVotes: z.string().refine(val => Number(val) > 0, { message: "Maximum votes must greater than 0." }),
    positionId: z.string(),
    classification: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a position classification."
    }),
    positionName: z.string().min(3, { message: "Must enter a valid position name." })
});

// candidate route
export const createCandidateSchema = z.object({
    candidatePhoto: z.instanceof(File).refine((file) => file.size > 0, { message: "Must upload candidate photo." }),
    classification: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a voter classification."
    }),
    fullName: z.string().min(4, { message: "Must enter a valid candidate full name." }),
    position: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a position."
    }),
    motto: z.string().min(4, { message: "Must enter a valid motto." })
});

export const updateCandidateSchema = z.object({
    candidatePhoto: z.instanceof(File).refine((file) => file.size > 0, { message: "Must upload candidate photo." }),
    classification: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a voter classification."
    }),
    fullName: z.string().min(4, { message: "Must enter a valid candidate full name." }),
    position: z.string().refine((value) => value !== "undefined", {
        message: "Must choose a position."
    }),
    motto: z.string().min(4, { message: "Must enter a valid motto." })
});


//voter schemas
export const voterLoginSchema = z.object({
    lrn: z.string().min(8, { message: "Must enter a valid LRN." }),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const updateAccountSchema = z.object({
    lrnVoterEmail: z.string(),
    password: z.string().min(6, { message: "Must choose a strong password." }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });
    }
})