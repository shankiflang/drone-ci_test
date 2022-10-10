/** @type {import('next').NextConfig} */


const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
})

module.exports = 
withPWA(
	{
		reactStrictMode: false,
		swcMinify: true,
		images: {
			domains: [
				'admin.localhost'
			]
		},
		async redirects() {
			return [
				{
					source: '/admin/content',
					destination: '/admin/content/articles',
					permanent: true
				},
				{
					source: '/admin',
					destination: '/admin/content/articles',
					permanent: true
				},
			]
		}
	}
)
