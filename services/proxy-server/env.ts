import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: path.resolve(
		__dirname,
		`${process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'}`
	),
});

export const ENV = {
	webUrl: process.env.WEB_API_URL,
	chatsApiUrl: process.env.CHATS_API_URL,
};
