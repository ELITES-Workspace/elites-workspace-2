// IMPORTED MODULES
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svelte-ux/**/*.{svelte,js}'],
	plugins: [require('svelte-ux/plugins/tailwind.cjs'), require('@tailwindcss/typography')],

	theme: {
		// SHADCN
		extend: {
			borderRadius: {
				lg: '0.5rem',
				md: 'calc(0.5rem - 2px)',
				sm: 'calc(0.5rem - 4px)',
			},
		},
	},

	// SVELTE-UX
	ux: {
		themes: {
			light: {
				primary: colors['cyan']['700'],
				'primary-content': 'white',
				secondary: colors['zinc']['800'],
				'secondary-content': 'white',
				accent: colors['zinc']['200'],
				'accent-content': 'black',
				info: colors['blue']['600'],
				'info-content': 'white',
				success: colors['emerald']['600'],
				'success-content': 'white',
				warning: colors['amber']['600'],
				'warning-content': 'white',
				danger: colors['rose']['600'],
				'surface-base': 'white',
				'surface-100': colors['zinc']['100'],
				'surface-200': colors['zinc']['200'],
				'surface-300': colors['zinc']['300'],
				'surface-content': colors['zinc']['900'],
				'color-scheme': 'light',
			},
			dark: {
				primary: colors['cyan']['700'],
				'primary-content': 'white',
				secondary: colors['zinc']['800'],
				'secondary-content': 'white',
				accent: colors['zinc']['700'],
				'accent-content': 'black',
				info: colors['blue']['600'],
				'info-content': 'white',
				success: colors['emerald']['600'],
				'success-content': 'white',
				warning: colors['amber']['600'],
				'warning-content': 'white',
				danger: colors['rose']['600'],
				'danger-content': 'white',
				'surface-base': colors['zinc']['950'],
				'surface-100': colors['zinc']['900'],
				'surface-200': colors['zinc']['800'],
				'surface-200': colors['zinc']['700'],
				'surface-content': colors['zinc']['100'],
				'color-scheme': 'dark',
			},
		},
	},
};
