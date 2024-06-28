import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { ActivateVoting, CandidatesDB, PositionsDB, UserListDB } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { user, supabaseAdmin } }) => {
	if (user) {
		const { role } = user;
		if (role !== 'service_role') return redirect(301, '/voter/voting-process');

		return {
			activate_vote: (await supabaseAdmin
				.from('activate_vote')
				.select('*')) as PostgrestSingleResponse<ActivateVoting[]>,
			user_list: (await supabaseAdmin
				.from('user_list_tb')
				.select('*')
				.order('user_fullname', { ascending: true })) as PostgrestSingleResponse<UserListDB[]>,
			created_positions: (await supabaseAdmin
				.from('created_positions_tb')
				.select('*')
				.order('created_at', { ascending: true })) as PostgrestSingleResponse<PositionsDB[]>,
			created_candidates: (await supabaseAdmin
				.from('created_candidates_tb')
				.select('*')
				.order('created_at', { ascending: true })) as PostgrestSingleResponse<CandidatesDB[]>
		};
	}

	return redirect(301, '/admin?no-session');
};
