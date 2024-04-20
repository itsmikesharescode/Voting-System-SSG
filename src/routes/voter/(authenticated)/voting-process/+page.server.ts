import type { DataModel } from "$lib/types";
import type { Actions } from "@sveltejs/kit";



export const actions: Actions = {
    submitVotes: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const serializeVotes = formData.get("setsOfvotes") as string;
        const setOfVotes = JSON.parse(serializeVotes) as DataModel[][];



    }
};