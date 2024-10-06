// IMPORTED DEP-TYPES
import type { Handle } from '@sveltejs/kit';
// IMPORTED DEP-MODULES
import { error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
// IMPORTED MODULES
import { Auth } from '$lib/server/classes';

// -- OBJECTS -- //

const limiter = new RateLimiter({
	rates: {
		IPUA: [100, 'm'],
	},
});

// -- HANDLERS -- //

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
	// CHECK RATE LIMITER ONLY IN PRODUCTION
	if (import.meta.env.PROD && (await limiter.isLimited(event))) throw error(429, { message: 'Too Many Requests' });

	// SET CORS FOR /api/uptime-robot
	if (event.url.pathname === '/api/uptime-robot') {
		const response = await resolve(event);
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Methods', '*');
		return response;
	}

	// -- INITIALIZATION -- //

	const auth = new Auth();
	await auth.init(event.cookies);

	// -- SET LOCALS -- //

	event.locals.auth = auth;

	if (auth.user) event.locals.user = auth.user;

	return await resolve(event);
};
