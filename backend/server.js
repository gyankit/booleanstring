require('dotenv').config();
const http = require('http');

const app = require('./config/app');
const { onError } = require('./helper/utils');

const port = '8000';
const host = '127.0.0.1';

app.set('port', port);
app.set('host', host);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on ${host}:${port}/graphql`)).on('error', onError);
