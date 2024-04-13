import { createVoterAccountSchema } from "$lib/schema";
import { fail, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";
import type { PageServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { UserListDB } from "$lib/types";

export const load: PageServerLoad = async ({ locals: { supabaseAdmin } }) => {

    return {
        user_list: await supabaseAdmin.from("user_list_tb").select("*") as PostgrestSingleResponse<UserListDB[]>,
    }

};

