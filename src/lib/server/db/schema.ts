// IMPORTED DEP-MODULES
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// -- TABLES -- //

export const usersTable = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	studentNumber: varchar('student_number', { length: 10 }).unique().notNull(),
	password: text('password').notNull(),
	avatarSeed: uuid('avatar_seed').notNull().defaultRandom(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
