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
            const { data: { user }, error: adminLoginError } = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password
            });

            if (adminLoginError) return fail(401, { msg: adminLoginError.message });
            else if (user) return fail(200, { msg: "Log in success. Welcome back!" })

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};