import type { ZodError } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { adminLoginSchema } from '$lib/schema';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (user) {
		console.log(user.role);
		const { role } = user;
		if (role !== 'service_role') return redirect(301, '/voter/voting-process');
		return redirect(301, '/admin/dashboard');
	}
};

export const actions: Actions = {
	adminLoginAction: async ({ locals: { supabase }, request }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			const result = adminLoginSchema.parse(formData);
			const {
				data: { user },
				error: adminLoginError
			} = await supabase.auth.signInWithPassword({
				email: result.email,
				password: result.password
			});

			if (adminLoginError) return fail(401, { msg: adminLoginError.message });
			else if (user) return fail(200, { msg: 'Log in success. Welcome back!' });
		} catch (error) {
			const zodError = error as ZodError;
			const { fieldErrors } = zodError.flatten();
			return fail(400, { errors: fieldErrors });
		}
	},

	adminLogoutAction: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) return fail(401, { msg: error.message });
		else return fail(200, { msg: 'Thanks for using this system!' });
	}
};
