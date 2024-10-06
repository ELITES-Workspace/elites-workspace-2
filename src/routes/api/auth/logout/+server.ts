// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ locals, cookies }) => {
	let data = null;
	let error = null;

	try {
		locals.auth.logout(cookies);
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
