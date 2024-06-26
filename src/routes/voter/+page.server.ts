import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PostgrestError } from '@supabase/supabase-js';
import type { ZodError } from 'zod';
import { resetPasswordSchema, updateAccountSchema, voterLoginSchema } from '$lib/schema';
import type { ActivateVoting, VoterLoginType } from '$lib/types';

export const load: PageServerLoad = async ({
	locals: { supabase, supabaseAdmin, user },
	cookies
}) => {
	const { data, error } = (await supabase.from('activate_vote').select('*')) as {
		data: ActivateVoting[];
		error: PostgrestError | null;
	};

	if (data[0].voting_active) {
		if (user) {
			const { role } = user;

			if (role !== 'authenticated') return redirect(301, '/admin/dashboard');
			else return redirect(301, '/voter/voting-process');
		}
	} else {
		return redirect(302, '/?Voting-Not-Active');
	}
};

export const actions: Actions = {
	loginAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = voterLoginSchema.parse(formData);
			const { data: loginCheck, error: loginCheckError } = (await supabaseAdmin.rpc(
				'login_checker',
				{
					lrn_param: result.lrn,
					password_param: result.password
				}
			)) as { data: VoterLoginType | null; error: PostgrestError | null };

			if (loginCheckError) return fail(401, { msg: loginCheckError.message });
			else if (loginCheck?.registered) {
				const {
					data: { user },
					error: loginError
				} = await supabase.auth.signInWithPassword({
					email: loginCheck.voterData.user_email,
					password: result.password
				});

				return fail(200, { msg: 'Login Success.' });
			}

			return fail(201, {
				msg: `Hi ${loginCheck?.voterData.user_fullname}, good to see you! `,
				voterData: loginCheck?.voterData
			});
		} catch (error) {
			const zodError = error as ZodError;
			const { fieldErrors } = zodError.flatten();
			return fail(400, { errors: fieldErrors });
		}
	},

	updateAccount: async ({ locals: { supabase, supabaseAdmin }, request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = updateAccountSchema.parse(formData);
			const lrnVoterEmail = JSON.parse(result.lrnVoterEmail) as {
				id: number;
				email: string;
				lrn: string;
				classification: string;
			};

			const {
				data: { user },
				error: updateAccountError
			} = await supabase.auth.signUp({
				email: lrnVoterEmail.email,
				password: result.password,
				options: {
					data: {
						classification: lrnVoterEmail.classification
					}
				}
			});

			if (updateAccountError) return fail(401, { msg: updateAccountError.message });
			else if (user) {
				const { error: updateUserListError } = await supabase
					.from('user_list_tb')
					.update([
						{
							user_password: result.password,
							not_registered: false,
							user_id: user.id
						}
					])
					.eq('id', lrnVoterEmail.id);

				if (updateUserListError) return fail(401, { msg: updateUserListError.message });
				else return fail(200, { msg: 'Account Updated Successfully.' });
			}
		} catch (error) {
			const zodError = error as ZodError;
			const { fieldErrors } = zodError.flatten();
			return fail(400, { errors: fieldErrors });
		}
	},

	logoutAction: async ({ locals: { supabase } }) => {
		const { error: logoutError } = await supabase.auth.signOut();
		if (logoutError) return fail(401, { msg: logoutError.message });
		else return fail(200, { msg: 'Thank you for use our system! come back again.' });
	},

	resetPasswordAction: async ({ locals: { supabase }, request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = resetPasswordSchema.parse(formData);

			const { error } = await supabase.auth.resetPasswordForEmail(result.email);

			if (error) return fail(401, { msg: error.message });
			else
				return fail(200, {
					msg: `An email containing the password reset link has been sent to your email. ${result.email}`
				});
		} catch (error) {
			const zodError = error as ZodError;
			const { fieldErrors } = zodError.flatten();
			return fail(400, { errors: fieldErrors });
		}
	}
};
