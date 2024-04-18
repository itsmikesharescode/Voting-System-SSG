import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostgrestError } from "@supabase/supabase-js";
import type { ZodError } from "zod";
import { voterLoginSchema } from "$lib/schema";
import type { VoterLoginType } from "$lib/types";

export const load: PageServerLoad = async ({ locals: { supabaseAdmin } }) => {

};

export const actions: Actions = {
    loginAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {

        const formData = Object.fromEntries(await request.formData());

        try {
            const result = voterLoginSchema.parse(formData);

            const { data: loginCheck, error: loginCheckError } = await supabaseAdmin.rpc("login_checker", {
                lrn_param: result.lrn,
                password_param: result.password
            }) as { data: VoterLoginType | null, error: PostgrestError | null }

            if (loginCheckError) return fail(401, { msg: loginCheckError.message });
            else if (loginCheck?.registered) {
                const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
                    email: loginCheck.voterData[0].user_email,
                    password: result.password
                });

                return fail(200, { msg: "Login Success." });
            }

            return fail(201, { msg: "Not Registered.", voterData: loginCheck?.voterData });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }



    }
};