/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		"src/pages/**/*.{js,ts,jsx,tsx}",
		"src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			sm: '425px', // mobile
			md: '768px', // tablet
			lg: '1024px', // laptop
			xl: '1440px', // desktop
			'2xl': '2560px', // 4k
		},
		textColor: {
			error: {
				main: '#E44115',
			},
			like: {
				main: '#EB532A',
				hover: '#E44115',
			},
			l: {
				100: '#000000',
				200: '#172940',
				300: '#4F5464',
				400: '#7E8C9E',
				500: '#a2b5cd',
				600: '#a2b5cd',
				blue: '#0088E1',
				yellow: '#FFC300',
				primary: {
					main: '#8866FF',
					light: '#9172fb',
					dark: '#4f3e8d',
				},
				secondary: {
					main: '#6644ff',
					light: '#9172fb',
					dark: '#7855fd',
				},
			},
			d: {
				100: '#ffffff',
				200: '#F0F6FC',
				300: '#c9d1d9',
				400: '#8E959B',
				500: '#666672',
				600: '#666672',
				blue: '#0088E1',
				yellow: '#FFC300',
				primary: {
					main: '#8866FF',
					light: '#9172fb',
					dark: '#4f3e8d',
				},
				secondary: {
					main: '#6644ff',
					light: '#9172fb',
					dark: '#7855fd',
				},
			},
		},
		extend: {
			boxShadow: {
				'l-inner': '0px 0px 0px 100px #FFFFFF inset',
				'd-inner': '0px 0px 0px 100px #0D1117 inset',
			},
			colors: {
				l: {
					actions: {
						create: "#d9d0ff",
						update: "#cce6ff",
						delete: "#f8d4da",
						login: "#d9d0ff",
						main: "#d9d0ff",
					},
					primary: {
						main: '#8866FF',
						light: '#9172fb',
						dark: '#4f3e8d',
					},
					secondary: {
						main: '#6644ff',
						light: '#9172fb',
						dark: '#7855fd',
					},
					default: '#FFFFFF',
					dark: '#e4eaf1',
					main: '#f0f4f9',
					light: '#FFFFFF',
					popup: '#FAFCFD',
					disabled: '#f7fafc',
					border: '#d3dae4',
					'border-light': '#DEE4EC',
					'border-dark': '#BFC8D5',
					error: '#FF0000',
					success: '#00FF00',
					blue: '#199FE8',
					yellow: '#FFC300',
				},
				d: {
					actions: {
						create: "#332953",
						update: "#1d3653",
						delete: "#49242e",
						login: "#2a2153",
						main: "#332953",
					},
					primary: {
						main: '#8866FF',
						light: '#9172fb',
						dark: '#4f3e8d',
					},
					secondary: {
						main: '#6644ff',
						light: '#9172fb',
						dark: '#7855fd',
					},
					default: '#0D1117',
					dark: '#21262E',
					main: '#30363D',
					light: '#3C4249',
					popup: '#161B22',
					border: '#3E4247',
					'border-light': '#666672',
					'border-dark': '#252A30',
					disabled: '#161B22',
					error: '#FF0000',
					success: '#00FF00',
					blue: '#199FE8',
					yellow: '#FFC300',
				},
			},
		},
	},
	plugins: [],
}
