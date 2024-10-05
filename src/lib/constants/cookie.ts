// IMPORTED DEP-TYPES
import type { CookieSerializeOptions } from 'cookie';
// IMPORTED MODULES
import { TIME } from './time';

// -- COOKIE OPTIONS -- //

export const COOKIE_OPTIONS: CookieSerializeOptions & { path: string } = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax',
	maxAge: TIME.YEAR,
};
