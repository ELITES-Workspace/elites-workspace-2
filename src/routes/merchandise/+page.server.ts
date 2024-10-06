// IMPORTED DEP-TYPE
import type { PageServerLoad } from './$types';
// IMPORTED MODULES
import { redirectWithNotice } from '$lib/server/utils';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirectWithNotice('/', 'You must login to view this page.');

	return {};
};
