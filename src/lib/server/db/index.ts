// EXPORTED MODULES
export * from './schema';
export * from './utils';

// IMPORTED DEP-MODULES
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
// IMPORTED MODULES
import * as schema from './schema';

const client = postgres(import.meta.env.VITE_DATABASE_URL);

export const db = drizzle(client, { schema });
