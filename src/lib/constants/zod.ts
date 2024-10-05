// IMPORTED DEP-MODULES
import { z } from 'zod';

// -- VALIDATIONS -- //

export const VALIDATION = {
	EMAIL: z.string().email('Please enter a valid email address').min(1, 'Email is required').max(50, 'Email should not be more than 50 characters'),
	PASSWORD: z.string().min(6, 'Password should be at least 6 characters long').max(20, 'Password should not be more than 20 characters'),
};
