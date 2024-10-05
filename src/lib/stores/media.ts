// IMPORTED DEP-MODULES
import { writable } from 'svelte/store';

// -- CONSTANTS -- //

export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
};

// -- STORES -- //

export const windowWidth = writable<number>(0);
export const isXS = writable<boolean>(false);
export const isSM = writable<boolean>(false);
export const isMD = writable<boolean>(false);
export const isLG = writable<boolean>(false);
export const isXL = writable<boolean>(false);
export const is2XL = writable<boolean>(false);
export const isSMDown = writable<boolean>(false);
export const isMDDown = writable<boolean>(false);
export const isLGDown = writable<boolean>(false);
export const isXLDown = writable<boolean>(false);
export const isXSUp = writable<boolean>(false);
export const isSMUp = writable<boolean>(false);
export const isMDUp = writable<boolean>(false);
export const isLGUp = writable<boolean>(false);
export const isXLUp = writable<boolean>(false);

// -- UTILS -- //

export function updateMedia(): void {
	if (typeof window === 'undefined') return;

	const width = window.innerWidth;

	isXS.set(width < BREAKPOINTS.sm);
	isSM.set(width >= BREAKPOINTS.sm && width < BREAKPOINTS.md);
	isMD.set(width >= BREAKPOINTS.md && width < BREAKPOINTS.lg);
	isLG.set(width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl);
	isXL.set(width >= BREAKPOINTS.xl && width < BREAKPOINTS['2xl']);
	is2XL.set(width >= BREAKPOINTS['2xl']);

	isSMDown.set(width < BREAKPOINTS.md);
	isMDDown.set(width < BREAKPOINTS.lg);
	isLGDown.set(width < BREAKPOINTS.xl);
	isXLDown.set(width < BREAKPOINTS['2xl']);

	isXSUp.set(width > BREAKPOINTS.sm);
	isSMUp.set(width > BREAKPOINTS.md);
	isMDUp.set(width > BREAKPOINTS.lg);
	isLGUp.set(width > BREAKPOINTS.xl);
	isXLUp.set(width > BREAKPOINTS['2xl']);
}

// -- SUBSCRIPTIONS -- //

windowWidth.subscribe(updateMedia);
