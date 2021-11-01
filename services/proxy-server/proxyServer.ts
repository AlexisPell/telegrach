import http from 'http';
import cors from 'cors';
import express from 'express';
import httpProxy from 'http-proxy';
import { reqLogger } from './reqLogger';
import { ENV } from './env';

// PROXY TO API
const api = async () => {
	const app = express();
	const proxyPass = httpProxy.createProxyServer({});

	app.use(cors());
	app.use(express.json());
	app.use('/favicon.ico', (req, res) => res.status(204));
	app.use(reqLogger);

	// Proxy pass
	app.use('*', async (req, res) => {
		// http
		// 	.get(`http://chats-api:5000/api/v1/chats`, (resp) => {
		// 		let data = '';
		// 		// A chunk of data has been received.
		// 		resp.on('data', (chunk) => {
		// 			data += chunk;
		// 		});
		// 		// The whole response has been received. Print out the result.
		// 		resp.on('end', () => {
		// 			console.log(JSON.parse(data));
		// 		});
		// 	})
		// 	.on('error', (err) => {
		// 		console.log('Error: ' + JSON.stringify(err));
		// 	});

		if (req.originalUrl.startsWith('/api/v1/chats')) {
			proxyPass.web(req, res, {
				target: `http://chats-api:${ENV.chatsApiPort}/${req.originalUrl}`,
			});
		} else {
			// 404
			res.json({ status: 404, msg: 'No such service found...' });
		}
	});

	const port = ENV.proxyApiPort || 8080;
	app
		.listen(port, () => console.log(`PROXY SERVER IS RUNNING ON PORT: ${port}`))
		.on('error', (err) => console.log('PROXY SERVER ERROR: ', err));
};
api();
