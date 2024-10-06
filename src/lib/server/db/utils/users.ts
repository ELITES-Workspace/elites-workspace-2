// IMPORTED TYPES
import type { User } from '$lib/types';
// IMPORTED DEP-MODULES
import { eq } from 'drizzle-orm';
// IMPORTED MODULES
import { decrypt, encrypt } from '$lib/server/utils';
import { db } from '..';
import { usersTable } from '../schema';

// -- FUNCTIONS -- //

export async function isStudentNumberTaken(studentNumber: string): Promise<boolean> {
	const users = await db.select().from(usersTable).where(eq(usersTable.studentNumber, studentNumber)).limit(1);

	return users.length > 0;
}

export async function createUser(user: typeof usersTable.$inferInsert): Promise<void> {
	if (await isStudentNumberTaken(user.studentNumber)) throw new Error('Student number is already taken!');

	await db.insert(usersTable).values({ ...user, password: encrypt(user.password) });
}

export async function updateAvatarSeed(id: string, avatarSeed: string): Promise<User> {
	const users = await db.update(usersTable).set({ avatarSeed }).where(eq(usersTable.id, id)).returning();

	if (!users.length) throw new Error('User not found!');

	return users[0];
}

export async function getUserByCredentials(studentNumber: string, password: string) {
	const users = await db.select().from(usersTable).where(eq(usersTable.studentNumber, studentNumber)).limit(1);

	if (!users.length) throw new Error('Credentials are incorrect!');

	const user = users[0];

	if (decrypt(user.password) !== password) throw new Error('Credentials are incorrect!');

	return user;
}
