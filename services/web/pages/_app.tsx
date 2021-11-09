// import 'tailwindcss/tailwind.css';
import './../styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<Head>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
			</Head>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}

export default MyApp;
