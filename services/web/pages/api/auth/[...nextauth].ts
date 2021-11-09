import NextAuth, { Account, Profile, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { CredentialInput } from 'next-auth/providers';

// console.log(
// 	'SERVER ENVIRONMENTS: ',
// 	process.env.MONGODB_URI,
// 	process.env.GOOGLE_CLIENT_ID,
// 	process.env.GOOGLE_CLIENT_SECRET
// );

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			} as any,
			authorize: async (credentials: { email: string; password: string } | any) => {
				console.log(
					'🚀 ~ file: [...nextauth].ts ~ line 47 ~ authorize: ~ credentials',
					credentials.email,
					credentials.password
				);
				const user = { email: credentials.email };
				return user;
			},
		}),
		// // Sign in with passwordless email link
		// Providers.Email({
		//   server: process.env.MAIL_SERVER,
		//   from: "<no-reply@example.com>",
		// }),
	],
	session: {
		jwt: true,
	},
	callbacks: {
		async signIn({
			user,
			account,
			profile,
			email,
			credentials,
		}: {
			user: User;
			account: Account;
			profile: Profile & Record<string, unknown>;
			email: {
				verificationRequest?: boolean | undefined;
			};
			credentials?: Record<string, CredentialInput> | undefined;
		}) {
			// 1st, and 5th are meaningful
			console.log(
				'🚀 ~ file: [...nextauth].ts ~ line 54 ~ signIn ~ user, account, profile, email, credentials',
				user,
				// account,
				// profile,
				// email,
				credentials
			);
			return true;
		},
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			console.log('🚀 ~ file: [...nextauth].ts ~ line 57 ~ redirect ~ url, baseUrl', url, baseUrl);
			const nginxUrl = process.env.NGINX_URL;
			return baseUrl;
		},
		session: async (session: Session, token: JWT) => {
			// console.log(
			// 	'🚀 ~ file: [...nextauth].ts ~ line 61 ~ session: ~ session, user',
			// 	session,
			// 	token
			// );
			return Promise.resolve(session);
		},
		async jwt({
			token,
			user,
			account,
			profile,
			isNewUser,
		}: {
			token: JWT;
			user: User;
			account: Account;
			profile: Profile;
			isNewUser: boolean;
		}) {
			// console.log(
			// 	'🚀 ~ file: [...nextauth].ts ~ line 68 ~ jwt ~ token, user, account, profile, isNewUser',
			// 	token,
			// 	user,
			// 	account,
			// 	profile,
			// 	isNewUser
			// );
			return token;
		},
	} as any,
	pages: {
		signIn: '/login',
	},
	secret: 'aahahahhhhahahaha',
	jwt: {
		secret: 'aahahahhhhahahaha',
	},
});
// https://github.com/nextauthjs/next-auth-example/blob/ndom91/update-v4/package.json
