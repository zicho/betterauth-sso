import { PersonRepo } from '$lib/server/db/repositories/PersonRepo';
import type {
	NewPerson,
	Person
} from '$lib/server/db/schema/schema';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: locals.user // load user data from locals (set in hooks)
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const repo = new PersonRepo();

		const data = await request.formData();
		const person: NewPerson = {
			first_name: data.get('first_name')!.toString(),
			last_name: data.get('last_name')!.toString(),
			gender: data
				.get('gender')!
				.toString() as Person['gender']
		};

		await repo.insert({
			data: person
		});
	}
} satisfies Actions;
