// IMPORTED TYPES
import type { InsertMembership } from '$lib/types';
// IMPORTED DEP-MODULES
import axios from 'axios';

// -- FUNCTIONS -- //

export async function countCurrentMembers() {
	const { data: result } = await axios.get('/api/db/memberships/count');

	if (result.error) throw new Error(result.error.message);

	return result.data.count || 0;
}

export async function createMembership(membership: InsertMembership) {
	const { data: result } = await axios.post('/api/db/memberships', membership);

	if (result.error) throw new Error(result.error.message);
}

export async function updateMembership(id: string, membership: InsertMembership) {
	const { data: result } = await axios.put(`/api/db/memberships/${id}`, membership);

	if (result.error) throw new Error(result.error.message);
}
