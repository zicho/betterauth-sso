// Assuming you have the following imports
import { db } from '../db';
import type { Person, PersonTable } from '../schema/schema';
import { BaseRepo } from './BaseRepo'; // Adjust the import path as necessary

export class PersonRepo extends BaseRepo<PersonTable> {
	constructor() {
		super('person'); // Pass the table key to the BaseRepo constructor
	}

	async findByName(name: string): Promise<Person | null> {
		const result = await db
			.selectFrom(this.tableKey)
			.where('first_name', '=', name)
			.selectAll()
			.executeTakeFirst();

		return result as Person;
	}
}
