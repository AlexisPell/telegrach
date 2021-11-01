import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';

const Home: NextPage = () => {
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

	return (
		<div className='bg-red-400 w-screen h-screen'>
			<Head>
				<title>Telegrach</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1>Hello boys!</h1>
				<Link href='/penises'>To penises!</Link>
			</main>
		</div>
	);
};

export default Home;
