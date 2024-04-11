import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
    const { user } = await safeGetSession();

    if (user) {
        const { role } = user;
        if (role !== "service_role") return redirect(301, "/voter/voting-process");

        return;
    }

    return redirect(301, "/admin?no-session");
};