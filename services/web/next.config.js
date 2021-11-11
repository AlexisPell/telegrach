/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		NGINX_URL: 'http://localhost',
		NEXTAUTH_URL: 'http://localhost:3000',
		SERVER_URL: 'http://localhost:8080/api/v1',
	},
};
