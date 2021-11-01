import cors from 'cors';
import express from 'express';
import httpProxy from 'http-proxy';
import { reqLogger } from './reqLogger';
import { ENV } from './../env';

const proxyPass = httpProxy.createProxyServer({});

const web = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(reqLogger);

	app.use('/', (req, res) => proxyPass.web(req, res, { target: `http://localhost:3000` }));

	const port = ENV.webPort || 80;
	app.listen(port, () => console.log(`FRONT IS RUNNING ON PORT: ${port}`));
};
web();

const api = async () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(reqLogger);

	// Proxy pass
	app.use('*', (req, res) => {
		const { originalUrl } = req;
		if (originalUrl.startsWith('/api/v1/chats')) {
			proxyPass.web(req, res, {
				target: `${ENV.chatsApiUrl}:${ENV.chatsApiPort}/${req.originalUrl}`,
			});
		} else {
			// 404
			res.json({ status: 404, msg: 'No such service found...' });
		}
	});

	const port = ENV.proxyPort || 8080;
	app.listen(port, () => console.log(`PROXY SERVER IS RUNNING ON PORT: ${port}`));
};
api();
