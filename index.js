const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const routes = require('./src/routes/routes.js');

const app = express();
const port = 3010;
const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};
const apiRouteInfo = require('./assets/routes.json');
const apiConfig = require('./src/config/api.config');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/public', express.static('static'));
app.use(routes);

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
