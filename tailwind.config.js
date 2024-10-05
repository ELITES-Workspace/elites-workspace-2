// IMPORTED MODULES
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svelte-ux/**/*.{svelte,js}'],
	plugins: [require('svelte-ux/plugins/tailwind.cjs'), require('@tailwindcss/typography')],

	theme: {
		// SHADCN
		extend: {
			colors: {
				border: 'hsl(240 5% 84% / <alpha-value>)',
				muted: {
					DEFAULT: 'hsl(240 4.8% 95.9% / <alpha-value>)',
					foreground: 'hsl(240 3.8% 46.1% / <alpha-value>)',
				},
				accent: {
					DEFAULT: 'hsl(240 4.8% 95.9% / <alpha-value>)',
					foreground: 'hsl(240 5.9% 10% / <alpha-value>)',
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100% / <alpha-value>)',
					foreground: 'hsl(240 10% 3.9% / <alpha-value>)',
				},
			},
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
				primary: colors['cyan']['600'],
				'primary-content': 'white',
				secondary: colors['zinc']['800'],
				'secondary-content': 'white',
				info: colors['blue']['600'],
				'info-content': 'white',
				success: colors['emerald']['600'],
				'success-content': 'white',
				warning: colors['amber']['600'],
				'warning-content': 'white',
				danger: colors['rose']['600'],
				'surface-100': 'white',
				'surface-200': colors['zinc']['100'],
				'surface-300': colors['zinc']['300'],
				'surface-content': colors['zinc']['900'],
				'color-scheme': 'light',
			},
			dark: {
				primary: colors['cyan']['600'],
				'primary-content': 'white',
				secondary: colors['zinc']['800'],
				'secondary-content': 'white',
				info: colors['blue']['600'],
				'info-content': 'white',
				success: colors['emerald']['600'],
				'success-content': 'white',
				warning: colors['amber']['600'],
				'warning-content': 'white',
				danger: colors['rose']['600'],
				'danger-content': 'white',
				'surface-100': colors['zinc']['800'],
				'surface-200': colors['zinc']['900'],
				'surface-300': colors['zinc']['950'],
				'surface-content': colors['zinc']['100'],
				'color-scheme': 'dark',
			},
		},
	},
};
