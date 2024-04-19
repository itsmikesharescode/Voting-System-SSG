import type { Actions } from "@sveltejs/kit";



export const actions: Actions = {
    submitVotes: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const setsOfvotes = formData.get("setsOfvotes") as string;

        const newSetVotes = new Set<string>(setsOfvotes);

        //fiiree
        newSetVotes.forEach(v => console.log(v))

    }
};