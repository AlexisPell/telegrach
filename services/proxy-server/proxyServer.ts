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
		const chatsPath = '/api/v1/chats';
		const isChatsRequest = req.originalUrl.startsWith(chatsPath);

		const authPath = '/api/v1/auth';
		const usersPath = '/api/v1/users';
		const profilesPath = '/api/v1/profiles';
		const isUsersProfilesRequest = req.originalUrl.startsWith(
			authPath || usersPath || profilesPath
		);

		if (isChatsRequest) {
			proxyPass.web(req, res, {
				target: `${ENV.chatsApiUrl}/${req.originalUrl}`,
			});
		} else if (isUsersProfilesRequest) {
			proxyPass.web(req, res, {
				target: `${ENV.usersProfilesUrl}/${req.originalUrl}`,
			});
		} else {
			res.status(404).json({ status: 404, msg: 'No such service found...' });
		}
	});

	const port = 8080;
	app
		.listen(port, () => console.log(`PROXY SERVER IS RUNNING ON PORT: ${port}`))
		.on('error', (err) => console.log('PROXY SERVER ERROR: ', err));
};
api();
