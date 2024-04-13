import type { Actions } from "@sveltejs/kit";


export const actions: Actions = {
    migrationAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();

    }
};