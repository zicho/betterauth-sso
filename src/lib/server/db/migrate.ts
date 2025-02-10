import { Migrator } from 'kysely';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db';
import { TypeScriptFileMigrationProvider } from './provider';

// Create __dirname equivalent in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function migrateToLatest() {
	// custom migration provider to use with TS files since Kysely "FileMigrationprovider" did not work
	const migrator = new Migrator({
		db,
		provider: new TypeScriptFileMigrationProvider(
			path.join(__dirname, '..', 'db', 'migrations')
		)
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
