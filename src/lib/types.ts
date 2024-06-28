import type { UserMetadata } from '@supabase/supabase-js';

export type ResultModel<T> = {
	status: number;
	type: string;
	data: T;
};

export type Dashboard = {
	totalVoters: number;
	totalVoted: number;
	totalCandidates: number;
	totalPositions: number;
};

export type AdminState = {
	activeItem: string;
	dashboard: Dashboard | null;
	votes: {
		activeTab: 'highschool' | 'elementary';
	};
	allvoters: {
		activeTab: 'highschool' | 'elementary';
		userList: UserListDB[] | null;
		filterSelection: 'voted' | 'unvoted' | 'notRegistered';
	};
	positions: {
		activeTab: 'highschool' | 'elementary';
		createdPositions: PositionsDB[] | null;
	};
	candidates: {
		activeTab: 'highschool' | 'elementary';
		createdCandidates: CandidatesDB[] | null;
		filterSelection: string | undefined;
		positions: string[] | null;
	};
};

// db types
export type UserListDB = {
	id: number;
	created_at: string;
	user_id: string;
	user_lrn: string;
	user_password: string;
	user_email: string;
	user_fullname: string;
	not_voted: boolean;
	not_registered: boolean;
	classification: 'elementary' | 'highschool';
	searchTearms?: string;
};

export interface MigrationFile {
	fullName: string;
	email: string;
	lrn: string;
	dateCreated: string;
}

export type PositionsDB = {
	id: number;
	created_at: string;
	position_name: string;
	classification: string;
	maximum_votes: number;
};

export type CandidatesDB = {
	id: number;
	created_at: string;
	candidate_fullname: string;
	candidate_motto: string;
	candidate_position: string;
	candidate_photo_link: string;
	position_id: number;
	classification: 'elementary' | 'highschool';
	storage_id: string;
	vote_count: number;
	maximum_vote: number;
};

export type VoterLoginType = {
	registered: boolean;
	voterData: UserListDB;
};

export type ActivateVoting = {
	id: number;
	created_at: string;
	voting_active: boolean;
};

//voter types
export type Candidates = {
	id: number;
	candidateName: string;
	candidateMotto: string;
	candidatePhoto: string;
};

export interface DataModel {
	position: string;
	candidate: Candidates;
}

export interface VotesCandidate {
	runningPosition: string;
	maxVote: number;
	candidates: Candidates[];
}

export type VotedCandidatesDB = {
	id: number;
	created_at: string;
	user_id: string;
	candidate_id: string;
	classification: string;
	position: string;
	candidate_name: string;
	user_fullname: string;
	candidate_photo: string;
};

export type RealTimeCandidates = {
	candidateName: string;
	voteCount: number;
	candidatePhoto: string;
};

export interface RealTimeVotesType {
	runningPosition: string;
	maxVote: number;
	candidates: RealTimeCandidates[];
}

//Search types
export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
	data: T[];
	filtered: T[];
	search: string;
}

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
	const searchTerm = store.search.toLowerCase() || '';
	store.filtered = store.data.filter((item) => {
		return item.searchTerms.toLowerCase().includes(searchTerm);
	});
};

//supabase workaround
export type SupabaseJwt = {
	aal: string;
	aud: string;
	email: string;
	exp: number;
	iat: number;
	phone: string;
	role: string;
	session_id: string;
	sub: string;
	amr?: { method: string; timestamp: number }[];
	app_metadata?: {
		provider?: string;
		providers?: string[];
		[key: string]: any;
	};
	is_anonymous?: boolean;
	iss?: string;
	jti?: string;
	nbf?: string;
	user_metadata: UserMetadata;
};
