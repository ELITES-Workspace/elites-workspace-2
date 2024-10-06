// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED DEP-MODULES
import { json } from '@sveltejs/kit';
// IMPORTED MODULES
import { updateAvatarSeed } from '$lib/server/db';
import { getRequestBody } from '$lib/server/utils';

export const PUT: RequestHandler = async ({ locals, request }) => {
	let data = null;
	let error = null;

	try {
		if (!locals.user) throw new Error('Permission denied!');

		const { avatarSeed } = await getRequestBody<{ avatarSeed: string }>(request, ['avatarSeed']);

		data = {
			user: await updateAvatarSeed(locals.user.id, avatarSeed),
		};
	} catch (e: any) {
		error = { message: e.message };
	}

	return json({ data, error });
};
