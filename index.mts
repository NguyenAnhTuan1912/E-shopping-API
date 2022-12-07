import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import routes from './src/routes/routes.mjs';
import apiConfig from './src/config/api.config.mjs';

const app = express();
const port = 3010;
const corsOptions = {
	origin: '*',
	optionSuccessStatus: 200,
};
console.log("import.meta.url: ", import.meta.url);
const __filename = fileURLToPath(import.meta.url);
console.log("__filename: ", `../${__filename}`);
const __dirname = dirname(__filename);
console.log("__dirname: ", __dirname);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/public', express.static(path.resolve('__dirname', '../static')));
app.use(routes);

app.get('/', (req: Request, res: Response) => {
	let html: string = fs.readFileSync(path.resolve('./static/html/index.html')).toString();
	const apiRoutesInfo = JSON.parse(fs.readFileSync(path.resolve('./assets/routes.json')).toString());
	const routeTemplate = fs
		.readFileSync(path.resolve('./assets/template/route.html'))
		.toString();
	const routeTemplates = (apiRoutesInfo as RouteInfoModel[])
		.map((apiRouteInfo) =>
			routeTemplate
				.replaceAll('[route]', apiRouteInfo.route)
				.replaceAll('[description]', apiRouteInfo.description)
		)
		.join(' ');
	html = html
		.replaceAll('[api-version]', apiConfig.version)
		.replaceAll('[routesTemplate]', routeTemplates);

	html = html.replaceAll(/>\s+</g, "><");
	res.setHeader("Content-Type", "text/html");
	res.send(html);
});

app.listen(port, () => {
  	console.log(`Example app listening at http://localhost:${port}`);
});