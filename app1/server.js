const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const compression = require('compression');

let port = 5000;
const portIndex = process.argv.indexOf('--port');
if (~portIndex) {
  port = process.argv[portIndex + 1];
}
const app = express();
app.use(compression());
app.use(cors());
app.use(history());
app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, () => {
  console.log(`listening ${port}`);
});
