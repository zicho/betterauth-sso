import { auth } from '$lib/server/auth'; // path to your auth file
import { migrateToLatest } from '$lib/server/db/migrator';
import {
	redirect,
	type Handle,
	type ServerInit
} from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const setSessionHook: Handle = async ({
	event,
	resolve
}) => {
	// this hooks needs to run first in order to set session properly before running the next hook
	return svelteKitHandler({ auth, event, resolve });
};

const checkAuthHook: Handle = async ({
	event,
	resolve
}) => {
	// if user is signed in, session should be here if the setSessionHook hook has been run
	const headers = event.request.headers;
	const session = await auth.api.getSession({
		headers
	});

	if (!session) {
		// redirect if no session is found
		const res = await auth.api.signInSocial({
			body: {
				provider: 'microsoft', // valid entries are "microsoft" and "github"
				callbackURL: '/'
			}
		});

		redirect(302, res.url!);
	}

	// set user data as you wish
	event.locals.user = session.user;

	// resolve as usual
	return await resolve(event);
};

export function handleError({ error }) {
	console.error(error);
}

export const handle = sequence(
	setSessionHook,
	checkAuthHook
);

export const init: ServerInit = async () => {
	console.log('running migrations');
	await migrateToLatest();
};
