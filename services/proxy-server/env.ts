import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: path.resolve(
		__dirname,
		`${process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'}`
	),
});

export const ENV = {
	proxyApiPort: process.env.PROXY_API_PORT,
	chatsApiUrl: process.env.CHATS_API_URL,
	chatsApiPort: process.env.CHATS_API_PORT,
};
