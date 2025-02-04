import { v4 as uuidv4 } from 'uuid';
import type { NamedMigration } from '../migrations';

const migration: NamedMigration = {
	name: '20241107_initial',
	up: async (db) => {
		// Ensure the pgcrypto extension is enabled for generating UUIDs
		// Create the 'users' table with a UUID primary key
		await db.schema
			.createTable('users')
			.addColumn('id', 'uuid', (col) =>
				col.primaryKey().defaultTo(uuidv4())
			)
			.addColumn('username', 'varchar', (col) =>
				col.notNull()
			)
			.execute();

		// Create the 'sessions' table with a UUID primary key and a foreign key referencing 'users'
		await db.schema
			.createTable('sessions')
			.addColumn('id', 'uuid', (col) =>
				col.primaryKey().defaultTo(uuidv4())
			)
			.addColumn('user_id', 'uuid', (col) =>
				col
					.references('users.id')
					.onDelete('cascade')
					.notNull()
			)
			.execute();

		// Create an index on the 'user_id' column in the 'sessions' table
		await db.schema
			.createIndex('user_session_id_index')
			.on('sessions')
			.column('user_id')
			.execute();
	},
	down: async (db) => {
		// Drop the tables in reverse order
		await db.schema.dropTable('sessions').execute();
		await db.schema.dropTable('users').execute();
	}
};

export default migration;
