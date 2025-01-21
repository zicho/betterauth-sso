import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: locals.user // load user data from locals (set in hooks)
	};
}) satisfies PageServerLoad;
