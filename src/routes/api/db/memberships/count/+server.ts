// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { countCurrentMembers } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	let data = null;
	let error = null;

	try {
		data = { count: await countCurrentMembers() };
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
