import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { ActivateVoting, CandidatesDB, UserListDB, VotedCandidatesDB } from '$lib/types';
import type { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';

export const load: LayoutServerLoad = async ({
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

			return {
				userData: (await supabaseAdmin
					.from('user_list_tb')
					.select('*')
					.eq('user_id', user?.id)
					.single()) as PostgrestSingleResponse<UserListDB>,
				candidates: (await supabaseAdmin
					.from('created_candidates_tb')
					.select('*')
					.eq('classification', user.user_metadata.classification)
					.order('created_at', { ascending: true })) as PostgrestSingleResponse<CandidatesDB[]>,
				votedCandidates: (await supabaseAdmin
					.from('vote_records_tb')
					.select('*')
					.eq('user_id', user.id)
					.order('created_at', { ascending: true })) as PostgrestSingleResponse<VotedCandidatesDB[]>
			};
		} else return redirect(301, '/voter');
	} else {
		return redirect(302, '/?Voting-Not-Active');
	}
};
