import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: path.resolve(
		__dirname,
		`${process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'}`
	),
});

export const ENV = {
	mongoUrl: process.env.MONGO_DB as string, // FROM ROOT
};
