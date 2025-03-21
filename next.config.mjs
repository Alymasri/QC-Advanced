/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// domains: [
		// 	'',
		// 	'cdn.pixabay.com',
		// 	'p16-amd-va.tiktokcdn.com',
		// 	'image.shutterstock.com',
		// 	'dev.appmania.co.in',
		// ],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.pixabay.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'p16-amd-va.tiktokcdn.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'image.shutterstock.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'dev.appmania.co.in',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
