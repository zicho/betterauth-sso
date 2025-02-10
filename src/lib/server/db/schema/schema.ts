import type {
	Insertable,
	Selectable,
	Updateable
} from 'kysely';
import type { EntityBase } from '../types/EntityBase';

export interface Database {
	person: PersonTable;
	pet: PetTable;
}

export interface PersonTable extends EntityBase {
	first_name: string;
	gender: 'man' | 'woman' | 'other';
	last_name: string | null;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;

export interface PetTable extends EntityBase {
	name: string;
	owner_id: number;
	species: 'dog' | 'cat';
}

export type Pet = Selectable<PetTable>;
export type NewPet = Insertable<PetTable>;
export type PetUpdate = Updateable<PetTable>;
