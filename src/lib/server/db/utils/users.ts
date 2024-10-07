// IMPORTED TYPES
import type { InsertUser, User } from '$lib/types';
// IMPORTED CONSTANTS
import { SCHOOL_YEAR } from '$lib/constants';
// IMPORTED DEP-MODULES
import { eq } from 'drizzle-orm';
// IMPORTED MODULES
import { decrypt, encrypt } from '$lib/server/utils';
import { db } from '..';
import { memberships, users, users as usersTable } from '../schema';

// -- FUNCTIONS -- //

export async function isStudentNumberTaken(studentNumber: string): Promise<boolean> {
	const users = await db.select().from(usersTable).where(eq(usersTable.studentNumber, studentNumber)).limit(1);

	return users.length > 0;
}

export async function createUser(user: InsertUser): Promise<void> {
	if (await isStudentNumberTaken(user.studentNumber)) throw new Error('Student number is already taken!');

	await db.insert(usersTable).values({ ...user, password: encrypt(user.password) });
}

export async function updateAvatarSeed(id: string, avatarSeed: string): Promise<User> {
	await db.update(usersTable).set({ avatarSeed }).where(eq(usersTable.id, id));

	return await getUserById(id);
}

export async function getUserById(id: string): Promise<User> {
	const user = await db.query.users.findFirst({
		where: eq(users.id, id),
		with: {
			memberships: {
				where: eq(memberships.schoolYear, SCHOOL_YEAR),
				limit: 1,
			},
		},
	});

	if (!user) throw new Error('User not found!');

	return user;
}

export async function getUserByCredentials(studentNumber: string, password: string) {
	const users = await db.select().from(usersTable).where(eq(usersTable.studentNumber, studentNumber)).limit(1);

	if (!users.length) throw new Error('Credentials are incorrect!');

	const user = users[0];

	if (decrypt(user.password) !== password) throw new Error('Credentials are incorrect!');

	return await getUserById(user.id);
}
