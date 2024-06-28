import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr';

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(supabaseURL, supabaseKEY, {
				global: { fetch }
			})
		: createServerClient(supabaseURL, supabaseKEY, {
				global: { fetch },
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	const session = isBrowser() ? (await supabase.auth.getSession()).data.session : data.session;

	return { supabase, session, user: data.user };
};
