// IMPORTED DEP-TYPES
import type { Cookies } from '@sveltejs/kit';
// IMPORTED TYPES
import type { User } from '$lib/types';
// IMPORTED CONSTANTS
import { COOKIE_OPTIONS } from '$lib/constants';
// IMPORTED MODULES
import { expect } from '$lib/utils';
import { getUserByCredentials } from '../db';
import { decrypt, encrypt } from '../utils';

// -- TYPES -- //

export type AuthToken = {
	studentNumber: string;
	password: string;
};

// -- CLASSES -- //

export class Auth {
	public readonly COOKIE_KEY = 'auth_token';

	public authToken: string | undefined;
	public user: User | undefined;

	public async init(cookies: Cookies): Promise<void> {
		try {
			expect({ cookies });

			const encrypted = cookies.get(this.COOKIE_KEY);

			if (!encrypted) return;

			const decrypted = decrypt<AuthToken>(encrypted);

			if (!decrypted) return;

			this.user = await getUserByCredentials(decrypted.studentNumber, decrypted.password);
		} catch {
			this.deleteCookie(cookies);
		}
	}

	public setCookie(authToken: string, cookies: Cookies): void {
		expect({ authToken, cookies });

		cookies.set(this.COOKIE_KEY, authToken, COOKIE_OPTIONS);
	}

	public getCookie(cookies: Cookies): string | undefined {
		expect({ cookies });

		return cookies.get(this.COOKIE_KEY);
	}

	public deleteCookie(cookies: Cookies): void {
		expect({ cookies });

		cookies.delete(this.COOKIE_KEY, COOKIE_OPTIONS);
	}

	public async login(studentNumber: string, password: string, cookies: Cookies): Promise<{ user: User }> {
		expect({ studentNumber, password, cookies });

		const user = await getUserByCredentials(studentNumber, password);

		const authToken = encrypt({ studentNumber, password });

		this.user = user;

		this.setCookie(authToken, cookies);

		return { user };
	}

	public logout(cookies: Cookies): void {
		this.deleteCookie(cookies);
		this.user = undefined;
	}

	public async refresh(cookies: Cookies): Promise<{ user: User }> {
		if (!this.user) throw new Error('User is not logged in!');

		const password = decrypt<string>(this.user?.password)!;

		return await this.login(this.user.studentNumber, password, cookies);
	}
}
