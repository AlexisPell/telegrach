import { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import {
	signIn,
	signOut,
	useSession,
	getProviders,
	getSession,
	ClientSafeProvider,
	LiteralUnion,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';
import { Button, Chip, TextField } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	console.log(
		'🚀 ~ file: index.tsx ~ line 9 ~ constgetServerSideProps:GetServerSideProps= ~ ctx',
		ctx.query
	);
	return {
		props: {
			session: await getSession(ctx),
			providers: await getProviders(),
		},
	};
};

interface LoginPageProps {
	session: Session | null;
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}
const LoginPage: NextPage<LoginPageProps> = ({ session, providers }) => {
	const router = useRouter();
	const { data: sessionInfo, status } = useSession();
	useEffect(() => {
		console.log('🚀 ~ file: index.tsx ~ line 25 ~ session, providers', session, providers);
		console.log('🚀 ~ file: index.tsx ~ line 42 ~ session, status', sessionInfo, status);
	}, []);

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const onChangeHandler = (e: any) => {
		console.log('creds: ', credentials);
		setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));
	};

	const signInHandler = (provider: ClientSafeProvider) => {
		signIn(provider.id, {
			// callbackUrl: `${process.env.NGINX_URL}`,
			...(provider.id === 'credentials' && credentials),
		});
	};

	// if (session) router.push('/');
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
					<TextField
						className='mb-4'
						value={credentials.email}
						onChange={onChangeHandler}
						label='Email'
						name='email'
						variant='outlined'
					/>
					<TextField
						className='mb-4'
						value={credentials.password}
						onChange={onChangeHandler}
						label='Password'
						name='password'
						variant='outlined'
					/>
					<Button
						onClick={() => signInHandler(providers.credentials)}
						className='flex justify-center w-full mb-4'
						variant='text'
					>
						<FiLogIn style={{ fontSize: '28px', marginRight: '10px' }} /> <span>Sign in</span>
					</Button>
					<Chip label='OR' className='mb-4' />
					<Button
						onClick={() => signInHandler(providers.google)}
						className='flex justify-start w-full mb-4'
						variant='outlined'
					>
						<FcGoogle className='text-3xl mr-5' /> <span>Sign in with Google</span>
					</Button>
				</div>
			</section>
		</>
	);
};

export default LoginPage;
