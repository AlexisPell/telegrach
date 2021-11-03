import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await axios.get('http://localhost:8080/api/v1/chats');
				console.log('RESPONSE:', res);
			} catch (error) {
				console.log('ERROR: ', error);
			}
		};
		fetch();
	}, []);

	if (status === 'loading')
		return <div className='text-xl text-center text-pink-600'>Loading...</div>;

	return (
		<div className='bg-red-400 w-screen h-screen'>
			<Head>
				<title>Telegrach</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1>Hello boys!</h1>
				{!session && (
					<button
						className='flex text-center text-xl text-green-600 p-4 m-4 bg-red-200 rounded-lg'
						onClick={() => signIn('google')}
					>
						Log In
					</button>
				)}
				{session && (
					<div className='text-center text-xl text-green-600'>
						Signed in as {session.user?.email} <br />
						<button onClick={() => signOut()}>Sign out</button>
					</div>
				)}
				<Link href='/penises'>To penises!</Link>
			</main>
		</div>
	);
};

export default Home;
