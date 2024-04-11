import { createVoterAccountSchema } from "$lib/schema";
import { fail, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";

export const actions: Actions = {
    createVoterAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        console.log(formData)
        try {
            const result = createVoterAccountSchema.parse(formData);

            const { data: { user }, error: createVoterError } = await supabaseAdmin.auth.admin.createUser({
                email: result.email,
                password: result.password,
                email_confirm: true
            });

            if (createVoterError) return fail(401, { msg: createVoterError.message });
            else if (user) {
                const { error: userInsert } = await supabaseAdmin.from("user_list_tb").insert([{
                    user_id: user.id,
                    user_lrn: result.voterLrn,
                    user_password: result.password,
                    user_fullname: result.fullName,
                    is_voted: false,
                    classification: result.classification,
                }]);

                if (userInsert) {
                    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
                    return fail(401, { msg: userInsert.message });
                } else return fail(200, { msg: "Voter Account Created." });

            }


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            console.log(fieldErrors)
            return fail(400, { errors: fieldErrors });
        }
    }
};