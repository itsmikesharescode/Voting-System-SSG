import { fail, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";

export const actions: Actions = {
    createVoterAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};