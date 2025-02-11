import { type Migration } from 'kysely';
import users from './0000_users';
import entities from './0001_entities';
// Import more migrations as needed

export type NamedMigration = Migration & {
	name: string; // might be excessive but I like it :)
};

export const migrations: Record<string, Migration> = {
	[users.name]: {
		up: users.up,
		down: users.down
	},
	[entities.name]: {
		up: entities.up,
		down: entities.down
	}
	// Add more migrations using the same pattern
};
