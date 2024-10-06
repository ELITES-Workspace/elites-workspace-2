// IMPORTED TYPES
import type { Auth } from '$lib/server/classes';
import type { User } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: Auth;
			user?: User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
