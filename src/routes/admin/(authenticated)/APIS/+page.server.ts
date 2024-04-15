import { createPositionSchema, createVoterAccountSchema, migrationDataSchema, updateVoterAccountSchema } from "$lib/schema";
import type { MigrationFile } from "$lib/types";
import { fail, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";


export const actions: Actions = {


    createVoterAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());
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
                    classification: result.classification,
                    user_lrn: result.voterLrn,
                    user_password: result.password,
                    user_fullname: result.fullName,
                    user_email: result.email.toLowerCase(),
                    not_registered: false,
                    not_voted: true,
                }]);

                if (userInsert) {
                    const deleteUser = await supabaseAdmin.auth.admin.deleteUser(user.id);
                    return fail(401, { msg: userInsert.message });
                } else return fail(200, { msg: "Voter Account Created." });

            }


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            console.log(fieldErrors)
            return fail(400, { errors: fieldErrors });
        }
    },


    migrationAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = migrationDataSchema.parse(formData);
            const parseData = JSON.parse(result.migrationData) as MigrationFile[];
            const { error: migrationError } = await supabaseAdmin.rpc("bulk_insert_user_list", { data: parseData, classification_param: result.classification });

            if (migrationError) return fail(401, { msg: migrationError.message });
            else return fail(200, { msg: "Data Uploaded Successfully." });


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }

    },

    updateVoterAccountAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updateVoterAccountSchema.parse(formData);

            if (result.userId === "no value") {

                const { error: updateDefaultVoterError } = await supabaseAdmin.from("user_list_tb").update([{
                    user_lrn: result.voterLrn,
                    user_password: result.password,
                    user_fullname: result.fullName,
                    classification: result.classification,
                    user_email: result.email

                }]).eq("id", result.voterId);
                if (updateDefaultVoterError) return fail(401, { msg: updateDefaultVoterError.message });
                else return fail(200, { msg: "Voter Information Updated." });
            }

            const { error: updateOrigVoterError } = await supabaseAdmin.from("user_list_tb").update([{
                user_lrn: result.voterLrn,
                user_password: result.password,
                user_fullname: result.fullName,
                classification: result.classification,
                user_email: result.email

            }]).eq("id", result.voterId);

            if (updateOrigVoterError) return fail(401, { msg: updateOrigVoterError.message });
            else {
                const { data: { user }, error: updateAuthError } = await supabaseAdmin.auth.admin.updateUserById(result.userId, {
                    email: result.email,
                    password: result.password
                });

                if (updateAuthError) return fail(401, { msg: updateAuthError.message });
                else if (user) return fail(200, { msg: "Voter Information Updated." });
            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    deleteVoterAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const voterId = formData.get("voterId") as string;
        const userId = formData.get("userId") as string;

        if (userId === "no value") {
            const { error: deleteVoterError } = await supabaseAdmin.from("user_list_tb").delete().eq("id", voterId);
            if (deleteVoterError) return fail(401, { msg: deleteVoterError.message });
            else return fail(200, { msg: "Account Deleted Successfully." })
        }

        const { error: deleteVoterError } = await supabaseAdmin.from("user_list_tb").delete().eq("id", voterId);

        if (deleteVoterError) return fail(401, { msg: deleteVoterError.message });
        else {
            const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(userId);

            if (deleteUserError) return fail(401, { msg: deleteUserError.message });
            else return fail(200, { msg: "Account Deleted Successfully." });
        }

    },

    createPositionAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = createPositionSchema.parse(formData);
            console.log(result)
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};