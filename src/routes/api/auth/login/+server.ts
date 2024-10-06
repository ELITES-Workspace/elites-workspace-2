// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { getRequestBody } from '$lib/server/utils';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	let data = null;
	let error = null;

	try {
		const { studentNumber, password } = await getRequestBody<{ studentNumber: string; password: string }>(request, [
			'studentNumber',
			'password',
		]);

		data = await locals.auth.login(studentNumber, password, cookies);
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
