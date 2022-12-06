const express = require('express');
const app = express();
const cors = require('cors');
const port = 3010;
const path = require('path');
const fs = require('fs');

const apiConfig = require('./src/config/api.config.js');
const apiRouteInfo = require('./assets/routes.json');
const apiVersion = apiConfig.version;
const apiBaseUrl = apiConfig.apiBaseUrl;

const productRoutes = require('./src/api/v1.0/products/products.routes.js');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

console.log(apiConfig);
console.log(productRoutes);

app.use(cors(corsOptions));
app.use('/public', express.static('static'));
app.use(`/${apiBaseUrl}/v${apiVersion}`, productRoutes);

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.resolve('./index.html')).toString();
  let routeTemplate = fs
    .readFileSync(path.resolve('./assets/template/route.html'))
    .toString();
  let routeTemplates = apiRouteInfo
    .map((apiRouteInfo) =>
      routeTemplate
        .replaceAll('[route]', apiRouteInfo.route)
        .replaceAll('[description]', apiRouteInfo.description)
    )
    .join(' ');
  html = html
    .replaceAll('[api-version]', apiConfig.version)
    .replaceAll('[routesTemplate]', routeTemplates);
  res.type('html');
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
