import type { Actions } from "@sveltejs/kit";


export const actions: Actions = {
    migrationAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const migrationData = formData.get("migrationData") as string;
        const parseData = JSON.parse(migrationData);

        console.log(parseData);

    }
};