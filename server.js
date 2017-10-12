const express = require('express');
const bodyParser = require('body-parser');
const Bluebird = require('bluebird');
const router = require('./server/router');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/client'));

app.use('/api', router);

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
