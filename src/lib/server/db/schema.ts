// IMPORTED DEP-MODULES
import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// -- TABLES -- //

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	studentNumber: varchar('student_number', { length: 10 }).unique().notNull(),
	password: text('password').notNull(),
	avatarSeed: uuid('avatar_seed').notNull().defaultRandom(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
	memberships: many(memberships),
}));

export const memberships = pgTable('memberships', {
	id: uuid('id').primaryKey().defaultRandom(),
	studentNumber: varchar('student_number', { length: 10 }).notNull(),
	lastName: varchar('last_name', { length: 50 }).notNull(),
	firstName: varchar('first_name', { length: 50 }).notNull(),
	middleName: varchar('middle_name', { length: 50 }),
	suffix: varchar('suffix', { length: 10 }),
	contactNumber: varchar('contact_number', { length: 11 }).notNull(),
	emailAddress: varchar('email_address', { length: 50 }).notNull(),
	residence: text('residence').notNull(),
	campus: varchar('campus', { length: 50 }).notNull(),
	schoolYear: varchar('school_year', { length: 50 }).notNull(),
	program: varchar('program', { length: 10 }).notNull(),
	year: varchar('year', { length: 3 }).notNull(),
	section: varchar('section', { length: 1 }).notNull(),
	emergencyName: varchar('emergency_name', { length: 50 }).notNull(),
	emergencyRelationship: varchar('emergency_relationship', { length: 50 }).notNull(),
	emergencyContactNumber: varchar('emergency_contact_number', { length: 11 }).notNull(),
	emergencyResidence: text('emergency_residence').notNull(),
	isAgreementConfirmed: boolean('is_agreement_confirmed').notNull().default(false),
	isConfirmed: boolean('is_confirmed').notNull().default(false),
	confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const membershipsRelations = relations(memberships, ({ one }) => ({
	user: one(users, { fields: [memberships.studentNumber], references: [users.studentNumber] }),
}));
