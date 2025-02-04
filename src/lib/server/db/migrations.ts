import { type Migration } from 'kysely';
import initial from './migrations/0001_initial';
// Import more migrations as needed

export type NamedMigration = Migration & {
	name: string; // might be excessive but I like it :)
};

export const migrations: Record<string, Migration> = {
	[initial.name]: {
		up: initial.up,
		down: initial.down
	}
	// Add more migrations using the same pattern
};
