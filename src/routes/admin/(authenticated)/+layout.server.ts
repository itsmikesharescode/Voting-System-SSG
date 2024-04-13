import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { UserListDB } from "$lib/types";

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabaseAdmin } }) => {
    const { user } = await safeGetSession();

    if (user) {
        const { role } = user;
        if (role !== "service_role") return redirect(301, "/voter/voting-process");

        return {
            user_list: await supabaseAdmin.from("user_list_tb").select("*") as PostgrestSingleResponse<UserListDB[]>,
        }
    }

    return redirect(301, "/admin?no-session");
};