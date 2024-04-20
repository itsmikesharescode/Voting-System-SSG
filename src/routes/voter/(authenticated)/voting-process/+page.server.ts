import type { DataModel } from "$lib/types";
import { fail, type Actions } from "@sveltejs/kit";



export const actions: Actions = {
    submitVotes: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = await request.formData();

        const userId = formData.get("userId") as string;
        const classification = formData.get("classification") as string;
        const userFullname = formData.get("userFullname") as string;

        const serializeVotes = formData.get("setsOfvotes") as string;
        const setOfVotes = JSON.parse(serializeVotes) as DataModel[][];

        const { error } = await supabaseAdmin.rpc("votes_insert", {
            votes_array: setOfVotes,
            user_id_param: userId,
            classification_param: classification,
            user_fullname_param: userFullname
        });

        if (error) return fail(401, { msg: error.message });
        else return fail(200, { msg: "Your Vote Successfully Recorded." })

    }
};