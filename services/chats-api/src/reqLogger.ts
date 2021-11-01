import { Request, Response } from 'express';

export const reqLogger = (req: Request, res: Response, next: () => void) => {
	console.log('=== === === REQUEST === === ===');
	// console.table(Object.entries(req));
	console.log('REQUEST INFO: url: ', req.url);
	console.log('REQUEST INFO: baseUrl: ', req.baseUrl);
	console.log('REQUEST INFO: originalUrl: ', req.originalUrl);
	console.log('REQUEST INFO: hostname: ', req.hostname);
	console.log('REQUEST INFO: method: ', req.method);
	console.log('REQUEST INFO: body: ', req.body);
	console.log('REQUEST INFO: cookies: ', req.cookies);
	console.log('REQUEST INFO: ip: ', req.ip);
	console.log('REQUEST INFO: params: ', req.params);
	console.log('REQUEST INFO: query: ', req.query);
	console.log('REQUEST INFO: path: ', req.path);
	console.log('REQUEST INFO: protocol: ', req.protocol);
	console.log('REQUEST INFO: route: ', req.route);
	console.log('REQUEST INFO: secure: ', req.secure);
	console.log('REQUEST INFO: xhr: ', req.xhr);
	console.log('REQUEST INFO: subdomains: ', req.subdomains);
	// console.log('REQUEST INFO: headers: ', req.headers);
	console.log('=== === === REQUEST === === ===');
	next();
};
