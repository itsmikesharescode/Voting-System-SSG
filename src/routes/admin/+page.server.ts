import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { adminLoginSchema } from "$lib/schema";

export const load: PageServerLoad = async () => {

};

export const actions: Actions = {
    adminLoginAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = adminLoginSchema.parse(formData);

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};