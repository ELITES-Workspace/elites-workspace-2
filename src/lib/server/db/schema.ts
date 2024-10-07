// IMPORTED DEP-MODULES
import { relations } from 'drizzle-orm';
import { boolean, doublePrecision, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

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

export const shirtOrders = pgTable('shirt_orders', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	code: varchar('code', { length: 30 }).notNull(),
	selected_black: boolean('selected_black').notNull().default(false),
	selected_white: boolean('selected_white').notNull().default(false),
	size: varchar('size', { length: 3 }).notNull(),
	sex: varchar('sex', { length: 6 }).notNull(),
	collarName: varchar('collar_name', { length: 6 }),
	customer: varchar('customer', { length: 50 }).notNull(),
	contactNumber: varchar('phone_number', { length: 11 }).notNull(),
	totalPrice: doublePrecision('total_price').notNull(),
	paymentMethod: varchar('payment_method', { length: 20 }).notNull(),
	gcashReferenceNo: varchar('gcash_reference_no', { length: 20 }),
	isPaymentConfirmed: boolean('is_payment_confirmed').notNull().default(false),
	status: varchar('status', { length: 20 }).notNull().default('Pre-ordered'),
	orderedAt: timestamp('ordered_at', { withTimezone: true }).notNull().defaultNow(),
});

export const shirtOrdersRelations = relations(shirtOrders, ({ one }) => ({
	user: one(users, { fields: [shirtOrders.userId], references: [users.id] }),
}));
