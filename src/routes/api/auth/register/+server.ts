// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP_MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { createUser } from '$lib/server/db';
import { getRequestBody } from '$lib/server/utils';

export const POST: RequestHandler = async ({ request }) => {
	let data = null;
	let error = null;

	try {
		const user = await getRequestBody(request, ['studentNumber', 'password']);

		await createUser(user);
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
