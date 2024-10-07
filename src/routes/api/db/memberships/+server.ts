// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { createMembership, listMemberships } from '$lib/server/db';
import { getRequestBody } from '$lib/server/utils';

export const POST: RequestHandler = async ({ request }) => {
	let data = null;
	let error = null;

	try {
		const membership = await getRequestBody(request);

		await createMembership(membership);
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};

export const GET: RequestHandler = async () => {
	let data = null;
	let error = null;

	try {
		data = { memberships: await listMemberships() };
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
