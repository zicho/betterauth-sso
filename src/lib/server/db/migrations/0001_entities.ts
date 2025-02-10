import { sql } from 'kysely';
import type { NamedMigration } from './_index';

const migration: NamedMigration = {
	name: '0000_users',
	up: async (db) => {
		await db.schema
			.createTable('person')
			.addColumn('id', 'uuid', (col) =>
				col.primaryKey().defaultTo(sql`gen_random_uuid()`)
			)
			.addColumn('first_name', 'varchar', (col) =>
				col.notNull()
			)
			.addColumn('last_name', 'varchar')
			.addColumn('gender', 'varchar(50)', (col) =>
				col.notNull()
			)
			.addColumn('created_at', 'timestamp', (col) =>
				col.defaultTo(sql`now()`).notNull()
			)
			.execute();

		await db.schema
			.createTable('pet')
			.addColumn('id', 'uuid', (col) =>
				col.primaryKey().defaultTo(sql`gen_random_uuid()`)
			)
			.addColumn('name', 'varchar', (col) =>
				col.notNull().unique()
			)
			.addColumn('owner_id', 'uuid', (col) =>
				col
					.references('person.id')
					.onDelete('cascade')
					.notNull()
			)
			.addColumn('species', 'varchar', (col) =>
				col.notNull()
			)
			.execute();

		await db.schema
			.createIndex('pet_owner_id_index')
			.on('pet')
			.column('owner_id')
			.execute();
	},
	down: async (db) => {
		await db.schema.dropTable('pet').execute();
		await db.schema.dropTable('person').execute();
	}
};

export default migration;
