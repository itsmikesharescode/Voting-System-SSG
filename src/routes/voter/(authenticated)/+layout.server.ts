import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { ActivateVoting } from "$lib/types";
import type { PostgrestError } from "@supabase/supabase-js";

export const load: LayoutServerLoad = async ({ locals: { supabase, supabaseAdmin, safeGetSession }, cookies }) => {

    const { user } = await safeGetSession();
    const { data, error } = await supabase.from("activate_vote").select("*") as { data: ActivateVoting[], error: PostgrestError | null }

    if (data[0].voting_active) {
        if (user) {
            const { role } = user;

            if (role !== "authenticated") return redirect(301, "/admin/dashboard");

            return {
                userData: await supabaseAdmin.from("user_list_tb").select("*").eq("user_id", user?.id).single()
            }

        } else return redirect(301, "/voter");
    } else {

        return redirect(302, "/?Voting-Not-Active");
    }
};