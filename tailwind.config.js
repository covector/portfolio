/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter"', 'sans-serif'],
				jersey: ['"Jersey 20"', 'sans-serif']
			}
		},
		screens: {
			sm: '641px',
			md: '769px',
			lg: '1025px',
			xl: '1281px',
			'2xl': '1537px'
		}
	},

	plugins: []
};
