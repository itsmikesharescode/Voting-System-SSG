import { writable } from 'svelte/store';
import type { SearchStoreModel } from './types';

export const selections = [
	{
		title: 'DASHBOARD',
		url: '/admin/dashboard'
	},

	{
		title: 'VOTES',
		url: '/admin/votes'
	},

	{
		title: 'ALL VOTERS',
		url: '/admin/all-voters'
	},

	{
		title: 'POSITIONS',
		url: '/admin/positions'
	},

	{
		title: 'CANDIDATES',
		url: '/admin/candidates'
	}
];

//search stores
export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
	const { subscribe, set, update } = writable<SearchStoreModel<T>>({
		data,
		filtered: data,
		search: ''
	});

	return {
		subscribe,
		set,
		update
	};
};
