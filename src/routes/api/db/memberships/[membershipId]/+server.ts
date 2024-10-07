// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { updateMembership } from '$lib/server/db';
import { getRequestBody } from '$lib/server/utils';

export const PUT: RequestHandler = async ({ request, params }) => {
	let data = null;
	let error = null;

	try {
		const membership = await getRequestBody(request);

		await updateMembership(params.membershipId, membership);
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
