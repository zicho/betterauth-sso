import type {
	DeleteResult,
	Insertable,
	InsertResult,
	Updateable,
	UpdateResult
} from 'kysely';
import { db } from '../db';
import type { Database } from '../schema/schema';
import type { EntityBase } from '../types/EntityBase';
import { DbHelper, type DbResult } from '../DbResult';

export abstract class BaseRepo<
	TTableEntity extends EntityBase
> {
	constructor(protected tableKey: keyof Database) {}

	async getById({
		id
	}: {
		id: string;
	}): Promise<DbResult<TTableEntity | null>> {
		try {
			const result = await db
				.selectFrom(this.tableKey as keyof Database)
				.where('id', '=', id)
				.selectAll()
				.executeTakeFirst();

			return DbHelper.success(result as TTableEntity);
		} catch (error) {
			return DbHelper.failed(error);
		}
	}

	async getMany({
		limit = 100
	}: { limit?: number } = {}): Promise<
		DbResult<TTableEntity[]>
	> {
		try {
			const result = await db
				.selectFrom(this.tableKey as keyof Database)
				.selectAll()
				.limit(limit)
				.execute();

			return DbHelper.success(result as TTableEntity[]);
		} catch (error) {
			return DbHelper.failed(error);
		}
	}

	async delete({
		ids
	}: {
		ids: string | string[];
	}): Promise<DbResult<DeleteResult[]>> {
		try {
			const result = await db
				.deleteFrom(this.tableKey as keyof Database)
				.where('id', 'in', ids)
				.execute();

			return DbHelper.success(result);
		} catch (error) {
			return DbHelper.failed(error);
		}
	}

	async insert({
		data
	}: {
		data:
			| Insertable<TTableEntity>
			| Insertable<TTableEntity>[];
	}): Promise<DbResult<InsertResult[]>> {
		try {
			const result = await db
				.insertInto(this.tableKey as keyof Database)
				.values(data)
				.execute();

			return DbHelper.success(result);
		} catch (error) {
			return DbHelper.failed(error);
		}
	}

	async update({
		id,
		data
	}: {
		id: string;
		data: Updateable<TTableEntity>;
	}): Promise<DbResult<UpdateResult[]>> {
		try {
			const result = await db
				.updateTable(this.tableKey as keyof Database)
				.set(data)
				.where('id', '=', id)
				.execute();

			return DbHelper.success(result);
		} catch (error) {
			return DbHelper.failed(error);
		}
	}
}
