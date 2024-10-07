// IMPORTED TYPES
import type { Membership } from '$lib/types';

// -- FUNCTIONS -- //

export function formatFullName(membership: Membership) {
	const { lastName, firstName, middleName, suffix } = membership;

	let fullName = `${lastName}, ${firstName}`;

	if (middleName) fullName += ` ${middleName}`;

	if (suffix) fullName += ` ${suffix}`;

	return fullName;
}
