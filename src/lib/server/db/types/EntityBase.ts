import type { Generated } from 'kysely';

export type EntityBase = {
	id: Generated<string>;
	createdAt?: Date;
	updatedAt?: Date;
};
