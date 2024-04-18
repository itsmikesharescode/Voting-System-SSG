import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostgrestError } from "@supabase/supabase-js";

export const load: PageServerLoad = async ({ locals: { supabaseAdmin } }) => {

};

export const actions: Actions = {
    loginAction: async ({ locals: { supabase, supabaseAdmin } }) => {
        const { data: checkRecord, error: checkRecordError } = await supabaseAdmin.rpc("login_checker", {
            email_param: "andrewbayudan@gmail.com",
            password_param: "default password",
        }) as { data: boolean, error: PostgrestError | null };

        if (checkRecordError) return fail(401, { msg: checkRecordError.message });

        else if (checkRecord) return fail(201, { msg: "Not Registered." });

        const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
            email: "",
            password: "",
        });

        if (loginError) return fail(401, { msg: loginError.message });

        else if (user) return fail(200, { msg: "Login Success." });


    }
};