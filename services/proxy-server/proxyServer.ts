import cors from 'cors';
import express from 'express';
import httpProxy from 'http-proxy';
import { reqLogger } from './reqLogger';
import { ENV } from './env';

const proxyPass = httpProxy.createProxyServer({});

// PROXY TO API
const api = async () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use('/favicon.ico', (req, res) => res.status(204));
	app.use(reqLogger);

	// Proxy pass
	app.use('*', async (req, res) => {
		if (req.originalUrl.startsWith('/api/v1/chats')) {
			proxyPass.web(req, res, {
				target: `${ENV.chatsApiUrl}/${req.originalUrl}`,
			});
		} else {
			// 404
			res.json({ status: 404, msg: 'No such service found...' });
		}
	});

	const port = 8080;
	app
		.listen(port, () => console.log(`PROXY SERVER IS RUNNING ON PORT: ${port}`))
		.on('error', (err) => console.log('PROXY SERVER ERROR: ', err));
};
api();
