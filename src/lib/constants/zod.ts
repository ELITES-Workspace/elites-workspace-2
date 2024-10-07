// IMPORTED DEP-MODULES
import { z } from 'zod';

// -- VALIDATIONS -- //

export const VALIDATION = {
	// -- PERSONAL INFO -- //
	LAST_NAME: z.string().min(1, 'Last name is required').max(50, 'Should not be more than 50 characters'),
	FIRST_NAME: z.string().min(1, 'First name is required').max(50, 'Should not be more than 50 characters'),
	MIDDLE_NAME: z.string().max(50, 'Should not be more than 50 characters').nullable(),
	SUFFIX: z.string().max(10, 'Should not be more than 10 characters').nullable(),
	CONTACT_NUMBER: z
		.string()
		.min(11, 'Should be 11 characters long')
		.max(11, 'Should be 11 characters long')
		.refine((value) => /^\d+$/.test(value), {
			message: 'Should only contain numbers',
			path: ['contactNumber'],
		}),
	EMAIL_ADDRESS: z
		.string()
		.email('Please enter a valid email address')
		.min(1, 'Email is required')
		.max(50, 'Should not be more than 50 characters'),
	RESIDENCE: z.string().min(1, 'Residence is required'),

	// -- STUDENT INFO -- //
	CAMPUS: z.string().min(1, 'Campus is required').max(50, 'Should not be more than 50 characters'),
	SCHOOL_YEAR: z.string().min(1, 'School year is required').max(50, 'Should not be more than 50 characters'),
	PROGRAM: z.string().min(1, 'Program is required').max(10, 'Should not be more than 10 characters'),
	YEAR: z.enum(['1st', '2nd', '3rd', '4th'], { message: 'Invalid year' }),
	SECTION: z.enum(['A', 'B', 'C', 'D', 'E'], { message: 'Invalid section' }),

	// -- EMERGENCY CONTACT -- //
	EMERGENCY_NAME: z.string().min(1, 'Name is required').max(50, 'Should not be more than 50 characters'),
	EMERGENCY_RELATIONSHIP: z.string().min(1, 'Relationship is required').max(50, 'Should not be more than 50 characters'),

	// -- MISC -- //
	AVATAR_SEED: z.string().min(1),

	// -- CREDENTIALS -- //
	STUDENT_NUMBER: z
		.string()
		.min(10, 'Should be 10 characters long')
		.max(10, 'Should be 10 characters long')
		.refine((value) => /^\d+$/.test(value), {
			message: 'Should only contain numbers',
			path: ['studentNumber'],
		})
		.refine((value) => value.startsWith('20') || value.startsWith('00'), {
			message: "Should start with '20' (BulSU) or '00' (Non-BulSU)",
			path: ['studentNumber'],
		}),
	PASSWORD: z.string().min(6, 'Should be at least 6 characters long').max(20, 'Should not be more than 20 characters'),
};
