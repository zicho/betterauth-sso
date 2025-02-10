import { Kysely } from 'kysely';
import type { Database } from '../schema/schema';
import { v4 as uuidv4 } from 'uuid';

export async function up(
	db: Kysely<Database>
): Promise<void> {
	await db.schema
		.createTable('user')
		.addColumn('id', 'text', (col) =>
			col.primaryKey().notNull().defaultTo(uuidv4())
		)
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('email', 'text', (col) =>
			col.notNull().unique()
		)
		.addColumn('emailVerified', 'boolean', (col) =>
			col.notNull()
		)
		.addColumn('image', 'text')
		.addColumn('createdAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('updatedAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('username', 'text', (col) => col.unique())
		.execute();

	await db.schema
		.createTable('session')
		.addColumn('id', 'text', (col) =>
			col.primaryKey().notNull().defaultTo(uuidv4())
		)
		.addColumn('expiresAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('token', 'text', (col) =>
			col.notNull().unique()
		)
		.addColumn('createdAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('updatedAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('ipAddress', 'text')
		.addColumn('userAgent', 'text')
		.addColumn('userId', 'text', (col) =>
			col.references('user.id').notNull()
		)
		.execute();

	await db.schema
		.createTable('account')
		.addColumn('id', 'text', (col) =>
			col.primaryKey().notNull().defaultTo(uuidv4())
		)
		.addColumn('accountId', 'text', (col) => col.notNull())
		.addColumn('providerId', 'text', (col) => col.notNull())
		.addColumn('userId', 'text', (col) =>
			col.references('user.id').notNull()
		)
		.addColumn('accessToken', 'text')
		.addColumn('refreshToken', 'text')
		.addColumn('idToken', 'text')
		.addColumn('accessTokenExpiresAt', 'timestamp')
		.addColumn('refreshTokenExpiresAt', 'timestamp')
		.addColumn('scope', 'text')
		.addColumn('password', 'text')
		.addColumn('createdAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('updatedAt', 'timestamp', (col) =>
			col.notNull()
		)
		.execute();

	await db.schema
		.createTable('verification')
		.addColumn('id', 'text', (col) =>
			col.primaryKey().notNull().defaultTo(uuidv4())
		)
		.addColumn('identifier', 'text', (col) => col.notNull())
		.addColumn('value', 'text', (col) => col.notNull())
		.addColumn('expiresAt', 'timestamp', (col) =>
			col.notNull()
		)
		.addColumn('createdAt', 'timestamp')
		.addColumn('updatedAt', 'timestamp')
		.execute();
}

export async function down(
	db: Kysely<Database>
): Promise<void> {
	// Drop tables in order so that no foreign-key constraints are violated.
	await db.schema.dropTable('verification').execute();
	await db.schema.dropTable('account').execute();
	await db.schema.dropTable('session').execute();
	await db.schema.dropTable('user').execute();
}
