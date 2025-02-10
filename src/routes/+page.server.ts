import { PersonRepo } from '$lib/server/db/repositories/PersonRepo';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: locals.user // load user data from locals (set in hooks)
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async () => {
		const repo = new PersonRepo();

		await repo.insert({
			data: {
				first_name: 'Martin',
				last_name: 'Ström',
				gender: 'man'
			}
		});
	}
} satisfies Actions;
