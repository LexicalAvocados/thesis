const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const Bluebird = require('bluebird');
const router = require('./server/router');
const db = require('./db');
const auth = require('./server/auth');

const passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;
const User = db.User;

const app = express();
const PORT = process.env.PORT || 3000;

passport.use(new FacebookStrategy({
    clientID: '1808121682812707',
    clientSecret: '44fdbb032d8a430258e537b674992851',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'name', 'email', 'displayName', 'gender', 'likes', 'movies', 'music', 'books', 'television', 'games', 'hometown']
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('accessToken', accessToken)
    var usernameInitials = profile.displayName.split(' ').reduce((acc, namepart) => {
      acc += namepart[0];
      return acc;
    }, '').toLowerCase();

    User.findOne(
      {where: { name: profile.displayName }
    })
    .then((existingUser, err) => {
      // console.log('incoming user', existingUser)
      if (!existingUser) {
        let params = ['likes', 'movies', 'music', 'books', 'television'];
        let likeObj = {};
        params.forEach((thing) => {
          likeObj[thing] = profile._json[thing].data.reduce((acc, curr) => {
            acc.push(curr.name); return acc;
          }, [])
        });
        // console.log('likeObj', likeObj)
        User.create({
          name: profile.displayName,
          username: usernameInitials,
          sex: profile.gender,
          fbId: profile.id,
          likes: likeObj.likes,
          movies: likeObj.movies,
          music: likeObj.music,
          books: likeObj.books,
          television: likeObj.television
        })
        .then( (newUser) => {
          // console.log('new user created', newUser)
          return cb(err, newUser)
        })
      } else {
        return cb(err, existingUser)
      }
    })
    .catch((err) => console.error('error in db call', err))
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cookieParser());

app.use(session({
  secret: 'machine learning',
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    saveUninitialized: true,
    secure: !true
  }
}));

// app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/client'));

app.use('/api', router);
app.post('/signup', (req, res) => auth.createAccount(req, res));
app.post('/login', (req, res) => auth.attemptLogin(req, res));
app.get('/logout', (req, res) => auth.logout(req, res));
app.put('/profile', (req, res) => auth.editProfile(req, res));

// app.use(auth.checkUser);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_likes', 'email', 'public_profile'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/loading', failureRedirect: '/login' }));

app.get('/userdata', (req, res) => {
  res.send(JSON.stringify(req.session))
})

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
