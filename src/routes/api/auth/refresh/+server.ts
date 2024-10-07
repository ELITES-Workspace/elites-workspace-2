// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	let data = null;
	let error = null;

	try {
		data = await locals.auth.refresh(cookies);
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
