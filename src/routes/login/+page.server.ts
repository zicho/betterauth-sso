import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	github: async () => {
		await signIn('github');
	},
	microsoft: async () => {
		await signIn('microsoft');
	}
} satisfies Actions;

async function signIn(provider: 'github' | 'microsoft') {
	const res = await auth.api.signInSocial({
		body: {
			provider,
			callbackURL: '/'
		}
	});

	redirect(302, res.url!);
}
