import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostgrestError } from "@supabase/supabase-js";
import type { ZodError } from "zod";
import { voterLoginSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals: { supabaseAdmin } }) => {

};

export const actions: Actions = {
    loginAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {

        const formData = Object.fromEntries(await request.formData());

        try {
            const result = voterLoginSchema.parse(formData);

            const { data: checkRecord, error: checkRecordError } = await supabaseAdmin.rpc("login_checker", {
                email_param: result.email,
                password_param: result.password,
            }) as { data: boolean, error: PostgrestError | null };

            if (checkRecordError) return fail(401, { msg: checkRecordError.message });

            else if (checkRecord) return fail(201, { msg: "Not Registered." });

            const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password,
            });

            if (loginError) return fail(401, { msg: loginError.message });

            else if (user) return fail(200, { msg: "Login Success." });
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }



    }
};