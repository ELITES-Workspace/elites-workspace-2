// IMPORTED TYPES
import type { usersTable } from '$lib/server/db';

// -- TYPES -- //

export type User = typeof usersTable.$inferSelect;
