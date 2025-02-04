import type {
	Session as BetterAuthSession,
	User as BetterAuthUser
} from 'better-auth';

import type {
	Insertable,
	Selectable,
	Updateable
} from 'kysely';

export interface Database {
	users: BetterAuthUser;
	sessions: BetterAuthSession;
}

// export interface UserTable {
// 	id: Generated<number>;
// 	username: string;
// }

// export interface SessionTable {
// 	id: Generated<number>;
// 	user_id: number;
// 	expires_at: Date;
// }

export type User = Selectable<BetterAuthUser>;
export type NewUser = Insertable<BetterAuthUser>;
export type UserUpdate = Updateable<BetterAuthUser>;

export type Session = Selectable<BetterAuthSession>;
export type NewSession = Insertable<BetterAuthSession>;
export type SessionUpdate = Updateable<BetterAuthSession>;
