const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const route = require('./src/routes/route');

var PORT = 3000 || process.env.PORT;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use(route);

app.listen(PORT, () => {
    console.log('Server running');
});