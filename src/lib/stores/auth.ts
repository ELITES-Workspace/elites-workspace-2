// IMPORTED TYPES
import type { usersTable } from '$lib/server/db';
import type { User } from '$lib/types';
// IMPORTED DEP-MODULES
import { goto } from '$app/navigation';
import axios from 'axios';
import toast from 'svelte-french-toast';
import { writable } from 'svelte/store';
// IMPORTED MODULES
import { createConfirmationDialog } from './dialog';

// -- STORES -- //

export const user = writable<User | undefined>();
export const isLoggedIn = writable<boolean>(false);

// -- FUNCTIONS -- //

export function initializeAuth(_user?: User) {
	if (_user) user.set(_user);
}

export async function refreshAuth() {
	try {
		const { data: result } = await axios.get('/api/auth/refresh');

		if (result.error) throw new Error(result.error.message);

		user.set(result.data.user);
	} catch (e: any) {
		user.set(undefined);
	}
}

export async function login(studentNumber: string, password: string) {
	const { data: result } = await axios.post('/api/auth/login', { studentNumber, password });

	if (result.error) throw new Error(result.error.message);

	user.set(result.data.user);
}

export async function register(user: typeof usersTable.$inferInsert) {
	console.log({ user });

	const { data: result } = await axios.post('/api/auth/register', user);

	if (result.error) throw new Error(result.error.message);

	await refreshAuth();
}

export async function logout() {
	const { data: result } = await axios.delete('/api/auth/logout');

	if (result.error) throw new Error(result.error.message);

	await refreshAuth();

	await goto('/');
}

export const handleLogout = () =>
	createConfirmationDialog({
		description: 'Are you sure you want to logout?',
		callback: () =>
			toast.promise(logout(), {
				loading: 'Logging out...',
				success: 'Successfully logged out!',
				error: (e) => e.message,
			}),
	});

export async function updateAvatarSeed(avatarSeed: string) {
	const { data: result } = await axios.put('/api/auth/update-avatar-seed', { avatarSeed });

	if (result.error) throw new Error(result.error.message);

	if (result.data && result.data.user) user.set(result.data.user);
}

// -- SUBSCRIPTIONS -- //

user.subscribe((value) => isLoggedIn.set(!!value));
