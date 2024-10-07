// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { updateMembership } from '$lib/server/db';

export const PUT: RequestHandler = async ({ params }) => {
	let data = null;
	let error = null;

	try {
		await updateMembership(params.membershipId, { isConfirmed: true });
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
