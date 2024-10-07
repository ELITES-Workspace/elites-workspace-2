// IMPORTED TYPES
import type { InsertMembership } from '$lib/types';
// IMPORTED CONSTANTS
import { SCHOOL_YEAR } from '$lib/constants';
// IMPORTED DEP-MODULES
import { and, eq } from 'drizzle-orm';
// IMPORTED MODULES
import { db } from '..';
import { memberships as membershipsTable } from '../schema';

// -- FUNCTIONS -- //

export async function countCurrentMembers(): Promise<number> {
	const memberships = await db
		.select({ id: membershipsTable.id })
		.from(membershipsTable)
		.where(and(eq(membershipsTable.schoolYear, SCHOOL_YEAR), eq(membershipsTable.isConfirmed, true)));

	return memberships.length;
}

export async function isMembershipExists(studentNumber: string, schoolYear: string): Promise<boolean> {
	const memberships = await db
		.select()
		.from(membershipsTable)
		.where(and(eq(membershipsTable.studentNumber, studentNumber), eq(membershipsTable.schoolYear, schoolYear)))
		.limit(1);

	return memberships.length > 0;
}

export async function createMembership(membership: InsertMembership): Promise<void> {
	if (await isMembershipExists(membership.studentNumber, membership.schoolYear)) throw new Error('Membership already exists!');

	await db.insert(membershipsTable).values(membership);
}

export async function updateMembership(id: string, membership: InsertMembership): Promise<void> {
	await db.update(membershipsTable).set(membership).where(eq(membershipsTable.id, id));
}
