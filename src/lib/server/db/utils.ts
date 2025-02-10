import type { Migration, MigrationProvider } from 'kysely';
import { migrations } from './migrator';

export class CustomMigrationProvider
	implements MigrationProvider
{
	async getMigrations(): Promise<
		Record<string, Migration>
	> {
		return migrations;
	}
}
