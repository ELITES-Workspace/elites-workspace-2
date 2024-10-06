// IMPORTED TYPES
import type { Notice } from '$lib/types';
// IMPORTED DEP-MODULES
import { redirect } from '@sveltejs/kit';
// IMPORTED MODULES
import { generateId } from '$lib/utils';

export function denyAccess(conditions: (boolean | [boolean, string])[]): void {
	for (let condition of conditions) {
		if (typeof condition === 'boolean') {
			if (condition) throw new Error('Access denied!');
		} else {
			if (condition[0]) throw new Error(condition[1]);
		}
	}
}

export function redirectWithNotice(path: string, message: string | undefined = undefined): void {
	if (message) {
		const notice: Notice = { id: generateId(), message };
		throw redirect(307, `${path}?notice=${encodeURIComponent(JSON.stringify(notice))}`);
	}
	throw redirect(307, path);
}

export function redirectToDashboard(message: string | undefined = undefined): void {
	if (message) {
		throw redirectWithNotice('/app/dashboard', message);
	}
	throw redirectWithNotice('/app/dashboard');
}

export async function getRequestBody<T = any>(request: Request, expect: string[] = []): Promise<T> {
	if (!request.body) throw new Error('No body provided!');

	const body = await request.json();

	if (!body) throw new Error('No body provided!');

	for (let target of expect) {
		if (!(target in body)) throw new Error(`Expected key "${target}" not found in body!`);
	}

	return body as T;
}
