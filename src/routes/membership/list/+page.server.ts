// IMPORTED DEP-TYPE
import type { PageServerLoad } from './$types';
// IMPORTED MODULES
import { redirectWithNotice } from '$lib/server/utils';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirectWithNotice('/', 'Permission denied!');

	if (!['2021500059'].includes(locals.user.studentNumber)) throw redirectWithNotice('/', 'Permission denied!');

	return {};
};
