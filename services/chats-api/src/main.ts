import express from 'express';
import cors from 'cors';
// import { Product, ProductDocument } from './entities/product';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { reqLogger } from './reqLogger';

dotenv.config({
	path: path.resolve(
		__dirname,
		'..',
		`${process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'}`
	),
});

const main = async () => {
	const app = express();
	await connect('mongodb://localhost:27017')
		.then((conn) => console.log(`MONGODB CONNECTED`))
		.catch((conn) => console.log(`MONGODB FAILED`));

	app.use(cors());
	app.use(express.json());
	app.use(reqLogger);

	app.get('/', (req, res) => {
		res.json({ path: 'CHATS APP / endpoint' });
	});

	app.get('/chats', (req, res) => {
		res.json({ path: 'CHATS APP /chats endpoint' });
	});

	app.get('/api/v1/chats', (req, res) => {
		res.json({ path: 'CHATS APP /api/v1/chats endpoint' });
	});

	app.get('/api/v1/chats/:userId', (req, res) => {
		res.json({ path: 'CHATS APP /api/v1/chats/:userId endpoint' });
	});

	const port = process.env.PORT || 8001;
	app.listen(port, () => console.log(`SERVER: CHATS - IS RUNNING ON PORT: ${port}`));
};
main();
