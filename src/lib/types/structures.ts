// IMPORTED TYPES
import type { memberships, users } from '$lib/server/db';

// -- TYPES -- //

export type User = typeof users.$inferSelect & {
	memberships?: Membership[];
};

export type Membership = typeof memberships.$inferSelect & {
	user?: User;
};

// -- FOR INSERT -- //

export type InsertUser = typeof users.$inferInsert;

export type InsertMembership = typeof memberships.$inferInsert;
