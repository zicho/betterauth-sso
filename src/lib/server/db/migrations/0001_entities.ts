import { Kysely, sql } from 'kysely';
import type { Database } from '../schema/schema';

export async function up(
	db: Kysely<Database>
): Promise<void> {
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
		.addColumn('species', 'varchar', (col) => col.notNull())
		.execute();

	await db.schema
		.createIndex('pet_owner_id_index')
		.on('pet')
		.column('owner_id')
		.execute();
}

export async function down(
	db: Kysely<Database>
): Promise<void> {
	await db.schema.dropTable('pet').execute();
	await db.schema.dropTable('person').execute();
}
