import cors from 'cors';
import express from 'express';
import httpProxy from 'http-proxy';
import { reqLogger } from './reqLogger';
import { ENV } from './../env';

const proxyPass = httpProxy.createProxyServer({});

const main = async () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(reqLogger);

	// TODO: redirect on frontend here
	// app.use('/', (req, res) => {
	// proxyPass.web(req, res, { target: `http://localhost:3000` });
	// });

	// Proxy pass
	app.use('*', (req, res) => {
		const { originalUrl } = req;
		switch (true) {
			// case originalUrl === '/' || originalUrl === '/favicon.ico':
			// 	proxyPass.web(req, res, { target: `http://localhost:3000` });
			// 	break;
			case originalUrl.startsWith('/api/v1/chats'):
				proxyPass.web(req, res, {
					target: `${ENV.chatsApiUrl}:${ENV.chatsApiPort}/${req.originalUrl}`,
				});
				break;
			default:
				res.json({ status: 404, msg: 'No such service found...' });
		}
	});

	const port = ENV.port || 8080;
	app.listen(port, () => console.log(`SERVER: CHATS - IS RUNNING ON PORT: ${port}`));
};
main();
