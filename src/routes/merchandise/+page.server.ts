// IMPORTED DEP-TYPE
import type { PageServerLoad } from './$types';
// IMPORTED MODULES
import { redirectWithNotice } from '$lib/server/utils';

export const load: PageServerLoad = async () => {
	throw redirectWithNotice('/', 'Coming soon!');
};
