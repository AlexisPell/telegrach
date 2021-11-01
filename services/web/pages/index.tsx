import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div className='bg-red-400 w-screen h-screen'>
			<Head>
				<title>Telegrach</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1>Hello boys!</h1>
			</main>
		</div>
	);
};

export default Home;
