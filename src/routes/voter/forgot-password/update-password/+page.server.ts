import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { updateAccountSchema, updatePasswordSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {

    const { data: { user }, error: checkUrlError } = await supabase.auth.verifyOtp({ token_hash: url.search.slice(1), type: 'email' });

    if (checkUrlError) return redirect(302, `/voter/forgot-password?${checkUrlError.message}`);
    else if (!user) return redirect(302, "/voter/forgot-password?invalid-session");

};

export const actions: Actions = {
    updatePasswordAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updatePasswordSchema.parse(formData);

            const { data: { user }, error: updatePwsErr } = await supabase.auth.updateUser({
                password: result.password
            });

            if (updatePwsErr) return fail(401, { msg: updatePwsErr.message });
            else if (user) {
                const { error: updateUserListErr } = await supabase.from("user_list_tb").update([{
                    user_password: result.password
                }]).eq("user_id", user.id);

                if (updateUserListErr) return fail(401, { msg: updateUserListErr.message });
                else return fail(200, { msg: "Password Updated Successfully." });
            };

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};