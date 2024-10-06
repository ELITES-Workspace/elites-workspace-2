// IMPORTED DEP-MODULES
import { z } from 'zod';

// -- VALIDATIONS -- //

export const VALIDATION = {
	AVATAR_SEED: z.string().min(1),

	STUDENT_NUMBER: z
		.string()
		.min(10, 'Should be 10 characters long')
		.max(10, 'Should be 10 characters long')
		.refine((value) => /^\d+$/.test(value), {
			message: 'Should only contain numbers',
			path: ['studentNumber'],
		})
		.refine((value) => value.startsWith('202'), {
			message: 'Should start with 202',
			path: ['studentNumber'],
		}),

	EMAIL: z
		.string()
		.email('Please enter a valid email address')
		.min(1, 'Email is required')
		.max(50, 'Should not be more than 50 characters'),

	PASSWORD: z.string().min(6, 'Should be at least 6 characters long').max(20, 'Should not be more than 20 characters'),
};
