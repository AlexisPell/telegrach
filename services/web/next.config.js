/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		NEXTAUTH_URL: 'http://localhost:3000',
		MONGODB_URI: 'mongodb://localhost:27017',
		GOOGLE_CLIENT_ID: '528406262334-k7fd2i639mri83483nu8255lcqisojiu.apps.googleusercontent.com',
		GOOGLE_CLIENT_SECRET: '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',
		// NGINX_URL: 'http://localhost',
		// FACEBOOK_CLIENT_ID: '621697638835386',
		// FACEBOOK_CLIENT_SECRET: 'c632225ff0655d8842626bbe83ac0a1d',
		// GITHUB_CLIENT_ID: 'd70272c29991d56917d5',
		// GITHUB_CLIENT_SECRET: '296d255156444d734ca1fc2c89a6b31a549c6a71',
	},
};
