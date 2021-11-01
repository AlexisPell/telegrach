import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			// name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'jsmith@gmail.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// console.log('🚀 ~ file: [...nextauth].js ~ line 18 ~ authorize ~ req', req);
				console.log('🚀 ~ file: [...nextauth].js ~ line 18 ~ authorize ~ credentials', credentials);
				// Add logic here to look up the user from the credentials supplied
				const user = { id: 1, email: credentials.email };

				// DB LOOKUP HERE
				if (credentials.username === 'test@gmail.com' && credentials.password === 'test') {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null or false then the credentials will be rejected
					return null;
					// You can also Reject this callback with an Error or with a URL:
					// throw new Error('error message') // Redirect to error page
					// throw '/path/to/redirect'        // Redirect to a URL
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			console.log('🚀 ~ file: [...nextauth].js ~ line 35 ~ jwt: ~ token, user', token, user);
			// first time jwt callback is run, user obj is available
			if (user) {
				token.id = user.id;
			}
			return jwtToken;
		},
		session: ({ token, session }) => {
			console.log('🚀 ~ file: [...nextauth].js ~ line 43 ~ token, session', token, session);
			if (token) {
				session.user.id = token.id;
			}
			return session;
		},
	},
	secret: 'test-secret',
	jwt: {
		secret: 'jwt-secret',
	},
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
		// error: '/auth/error',
		// verifyRequest: '/auth/verify-request',
		// newUser: '/auth/new-user'
	},
});
