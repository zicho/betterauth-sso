// See https://svelte.dev/docs/kit/types#app.d.ts

import type {
	Account,
	Session,
	User,
	Verification
} from 'better-auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
			session: Session;
			account: Account;
			verification: Verification;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
