const express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const Bluebird = require('bluebird');
const router = require('./server/router');
const db = require('./db');
const auth = require('./server/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cookieParser());

app.use(session({
  secret: 'machine learning',
  cookie: {
    maxAge: 6000000,
    saveUninitialized: true,
    secure: !true
  }
}));

// app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/client'));



app.use('/api', router);

app.post('/signup', (req, res) => auth.createAccount(req, res));
app.post('/login', (req, res) => auth.attemptLogin(req, res));
app.get('/logout', auth.logout);
// app.use(auth.checkUser);

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
