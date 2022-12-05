const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const fs = require('fs');
const config = require('./package.json');

const routes = require('./routes.js');

const apiVersion = config.version;
const apiBaseUrl = config.apiBaseUrl;

app.use('/public', express.static('static'));
app.use(`/${apiBaseUrl}/v${apiVersion}`, routes);

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.resolve('./index.html')).toString();
  html = html.replace('[api-version]', config.version);
  res.type('html');
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
