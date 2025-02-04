import { PRIVATE_PG_HOST } from '$env/static/private';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from './schema/schema';

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		connectionString: PRIVATE_PG_HOST
	})
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
	dialect
});
