import express from 'express';
import cors from 'cors';
import { Product, ProductDocument } from './entities/product';
import { connect } from 'mongoose';
import { reqLogger } from './reqLogger';
import { ENV } from '../env';

const main = async () => {
	const app = express();
	await connect(ENV.mongoUrl)
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

	const port = process.env.CHATS_PORT || 5001;
	app.listen(port, () => console.log(`SERVER: CHATS - IS RUNNING ON PORT: ${port}`));
};
main();
