import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../src/hooks/useRedux';
import router from 'next/router';
import { authAsyncActions } from '../src/store/auth/authActionCreators';
import { Navbar } from '../src/components/navbar';

const Home: NextPage = () => {
	// const { data: session, status } = useSession();
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.authReducer);

	useEffect(() => {
		// if (!authState.isAuthorized) {
		// 	router.push('/login');
		// }
		dispatch(authAsyncActions.getMe());
	}, []);

	return (
		<div className='bg-red-400 w-screen h-screen'>
			<Head>
				<title>Telegrach</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<Navbar />
				<div className='h-20 w-full bg-blue-400'>
					<Link href='/penises'>To penises!</Link>
				</div>
			</main>
		</div>
	);
};

export default Home;
