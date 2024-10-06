// IMPORTED DEP-MODULES
import { writable } from 'svelte/store';
// IMPORTED MODULES
import { generateId } from '$lib/utils';

// -- TYPES -- //

export type DialogType = 'confirmation';

export type Dialog = {
	id: string;
	type: DialogType;
	title: string;
	description: string;
	persist: boolean;
	isRemoved: boolean;
	callback: () => void | Promise<void>;
	cancelCallback?: () => void | Promise<void>;
};

// -- CONSTANTS -- //

export const DIALOG_REMOVE_DURATION = 300;

export const CUSTOM_DIALOGS = {
	login: false,
	register: false,
};

// -- STORES -- //

export const dialogs = writable<Dialog[]>([]);

export const customDialogs = writable<typeof CUSTOM_DIALOGS>(CUSTOM_DIALOGS);

// -- FUNCTIONS -- //

export const openCustomDialog = (dialog: keyof typeof CUSTOM_DIALOGS) =>
	customDialogs.update((val) => ({ ...val, [dialog]: true }));

export const closeCustomDialog = (dialog: keyof typeof CUSTOM_DIALOGS) =>
	customDialogs.update((val) => ({ ...val, [dialog]: false }));

export function createConfirmationDialog(options: {
	title?: string;
	description: string;
	persist?: boolean;
	callback: () => void | Promise<void>;
	cancelCallback?: () => void | Promise<void>;
}): void {
	const dialog: Dialog = {
		id: generateId(),
		type: 'confirmation',
		title: options.title || 'Confirmation',
		description: options.description,
		persist: typeof options.persist === 'boolean' ? options.persist : true,
		isRemoved: false,
		callback: options.callback,
		cancelCallback: options.cancelCallback,
	};
	dialogs.update((dialogs) => [...dialogs, dialog]);
}

export function removeDialog(id: string): void {
	dialogs.update((dialogs) =>
		dialogs.filter((dialog) => {
			if (dialog.id === id) dialog.isRemoved = true;
			return dialog;
		}),
	);

	// REMOVE DIALOG AFTER TIMEOUT
	setTimeout(() => dialogs.update((val) => val.filter((dialog) => dialog.id !== id)), DIALOG_REMOVE_DURATION);
}
