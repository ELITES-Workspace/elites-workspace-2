// IMPORTED DEP-TYPE
import type { PageServerLoad } from './$types';
// IMPORTED MODULES
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	throw redirect(307, '/membership');
};
