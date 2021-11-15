import { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import { Button, Chip, TextField } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};

interface LoginPageProps {}
const LoginPage: NextPage<LoginPageProps> = ({}) => {
	const router = useRouter();

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const onChangeHandler = (e: any) => {
		console.log('creds: ', credentials);
		setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));
	};

	const signInHandler = () => {};

	return (
		<>
			<Head>
				<title>Telegrach | Login</title>
			</Head>
			<section className='h-screen w-screen bg-blue-500 flex align-middle'>
				<div className='m-auto md:w-96 w-80 shadow-md bg-white h-auto rounded-xl px-5 py-10 flex flex-col align-middle justify-center'>
					<div className='text-center text-blue-500 text-2xl mb-6 font-bold'>
						Welcome to Telegrach
					</div>
					<div className='mb-4'>
						<TextField
							className='w-full'
							value={credentials.email}
							onChange={onChangeHandler}
							label='Email'
							name='email'
							variant='outlined'
						/>
					</div>
					<div className='mb-4'>
						<TextField
							className='w-full'
							value={credentials.password}
							onChange={onChangeHandler}
							label='Password'
							name='password'
							variant='outlined'
						/>
					</div>
					<div className='mb-4'>
						<Button className='flex justify-center w-full' variant='text'>
							<FiLogIn style={{ fontSize: '28px', marginRight: '10px' }} /> <span>Sign in</span>
						</Button>
					</div>
					<Chip label='OR' className='mb-4' />
					<Button className='flex justify-start w-full' variant='outlined'>
						<FcGoogle className='text-3xl mr-5' /> <span>Sign in with Google</span>
					</Button>
					<div className='mb-4' />
					<Button className='flex justify-start w-full' variant='outlined'>
						<FaDiscord className='text-3xl mr-5' /> <span>Sign in with Discord</span>
					</Button>
				</div>
			</section>
		</>
	);
};

export default LoginPage;
