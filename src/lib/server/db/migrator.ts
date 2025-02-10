import {
	Migrator,
	type Migration,
	type MigrationProvider
} from 'kysely';
import { migrations } from './migrations/_index';
import { db } from './db';

export class CustomMigrationProvider
	implements MigrationProvider
{
	async getMigrations(): Promise<
		Record<string, Migration>
	> {
		return migrations;
	}
}

export async function migrateToLatest() {
	// custom migration provider to use with TS files since Kysely "FileMigrationprovider" did not work

	const migrator = new Migrator({
		db,
		provider: new CustomMigrationProvider()
	});

	const { error, results } =
		await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(
				`migration "${it.migrationName}" was executed successfully`
			);
		} else if (it.status === 'Error') {
			console.error(
				`failed to execute migration "${it.migrationName}"`
			);
		}
	});

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		process.exit(1);
	}
}
