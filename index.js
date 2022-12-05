const express = require('express');
const app = express();
const cors = require('cors');
const port = 3010;
const path = require('path');
const fs = require('fs');
const config = require('./package.json');
const routes = require('./routes.js');

const apiRoutesInfo = require('./assets/routes.json');
const apiVersion = config.version;
const apiBaseUrl = config.apiBaseUrl;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/public', express.static('static'));
app.use(`/${apiBaseUrl}/v${apiVersion}`, routes);

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.resolve('./index.html')).toString();
  let routeTemplate = fs
    .readFileSync(path.resolve('./assets/template/route.html'))
    .toString();
  let routeTemplates = apiRoutesInfo
    .map((apiRouteInfo) =>
      routeTemplate
        .replaceAll('[route]', apiRouteInfo.route)
        .replaceAll('[description]', apiRouteInfo.description)
    )
    .join(' ');
  console.log(routeTemplates);
  html = html
    .replaceAll('[api-version]', config.version)
    .replaceAll('[routesTemplate]', routeTemplates);
  res.type('html');
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
