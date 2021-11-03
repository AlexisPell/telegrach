import NextAuth, { Account, Awaitable, Profile, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { CredentialInput } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';

// type Email = { verificationRequest?: boolean | undefined }
// const callbacks = {
//   async signIn: (user: User, account: Account, profile: Profile & Record<string, unknown>, email: Email, credentials?: Record<string, CredentialInput>): any {
//     if (account.provider === 'google' &&
//         profile.verified_email === true &&
//         profile.email?.endsWith('@example.com')) {
//       return true
//     } else {
//       return false
//     }
//   },
// }

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization:
				'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
		}),
	],
	// jwt: {},
	secret: process.env.SECRET,
	callbacks: {
		jwt: (async ({ token, account }) => {
			console.log('🚀 ~ file: [...nextauth].ts ~ line 31 ~ jwt: ~ account', account);
			console.log('🚀 ~ file: [...nextauth].ts ~ line 31 ~ jwt: ~ token', token);
			if (account?.access_token) {
				token.accessToken = account.access_token;
			}
			return token;
		}) as (params: {
			token: JWT;
			user?: User | undefined;
			account?: Account | undefined;
			profile?: Profile | undefined;
			isNewUser?: boolean | undefined;
		}) => Promise<any>,
		// redirect: (async ({ url, baseUrl }) => {
		// 	if (url === '/profile') {
		// 		return Promise.resolve('/'); // home
		// 	}
		// 	return Promise.resolve('/'); // home
		// }) as (params: { url: string; baseUrl: string }) => Promise<any>,
	},
});
