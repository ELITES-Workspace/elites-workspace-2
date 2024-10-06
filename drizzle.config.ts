// IMPORTED DEP-MODULES
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/server/db/schema.ts',
	out: './src/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.VITE_DATABASE_URL as string,
	},
	verbose: true,
	strict: true,
});
