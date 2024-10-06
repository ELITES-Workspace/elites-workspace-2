// IMPORTED CONSTANTS
import { TIME } from '$lib/constants';
// IMPORTED DEP-MODULES
import confetti from 'canvas-confetti';

// -- FUNCTIONS -- //

export const generateId = () => crypto.randomUUID();

export const isAsync = (func: Function) => func.constructor.name === 'AsyncFunction';

export function expect(object: { [key: string]: any }): void {
	Object.keys(object).forEach((key) => {
		if (typeof object[key] === 'undefined') throw new Error(`Expected key "${key}" not found in object!`);

		if (object[key] === null) throw new Error(`Expected key "${key}" not found in object!`);
	});
}

export const triggerConfetti = () => {
	const end = Date.now() + 1 * TIME.SECOND;
	const colors = ['#0369a1', '#7c3aed', '#ffffff'];

	(function frame() {
		confetti({
			particleCount: 3,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: colors,
		});
		confetti({
			particleCount: 3,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: colors,
		});

		if (Date.now() < end) requestAnimationFrame(frame);
	})();
};
