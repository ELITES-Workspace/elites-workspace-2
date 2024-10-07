// IMPORTED TYPES
import type { memberships, users } from '$lib/server/db';

// -- TYPES -- //

export type User = typeof users.$inferSelect & {
	memberships?: Membership[];
};

export type Membership = typeof memberships.$inferSelect & {
	user?: User;
};

export type Merch = {
	code: string;
	name: string;
	thumbnail: string;
	price: number;
	sold: number;
	eligibility: 'members' | 'non-members';
	href: string;
	isPreview: boolean;
};

// -- FOR INSERT -- //

export type InsertUser = typeof users.$inferInsert;

export type InsertMembership = typeof memberships.$inferInsert;
