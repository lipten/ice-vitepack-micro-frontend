const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');

let port = 5000;
const portIndex = process.argv.indexOf('--port');
if (~portIndex) {
  port = process.argv[portIndex + 1];
}
const app = express();
app.use(history());
app.use(express.static(path.join(__dirname, './build')));

app.listen(port, () => {
  console.log(`listening ${port}`);
});
