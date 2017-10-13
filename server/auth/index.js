const bcrypt = require('bcrypt');
const User = require('../../db').User;


exports.createAccount = (req, res) => {
  console.log('createAccount req.body:', req.body);
  const saltRounds = 10;
  let {username, password, email, isCreator} = req.body;

  bcrypt.genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        email,
        isCreator
      });
    })
    .then(newUser => {
      req.session.username = username;
      newUser = newUser.dataValues;
      console.log('New User inserted:', newUser);
      delete newUser.password;

      res.send({
        loggedIn: true,
        userData: newUser,
      });
    })
    .catch(err => console.log('Account creation error!'));
};


exports.attemptLogin = (req, res) => {
  console.log('attemptLogin req.body:', req.body);
  let {username, password} = req.body;
  let existingUser;

  User.findOne({where: {username}})
    .then(user => {
      console.log('user fetched from DB:', user);
      if (user === undefined) {
        console.log('Account not found!');
        res.send({loggedIn: false, reason: 'Account Not Found'});
      }
      existingUser = user.dataValues;
      return bcrypt.compare(password, user.password)
    })
    .then(isValid => {
      if (isValid) {
        req.session.username = username;
        delete existingUser.password;

        let resObj = JSON.stringify({
          loggedIn: true,
          userData: existingUser,
        })
        req.session.save();
        res.setHeader('Content-Type', 'application/json');
        res.send(resObj);
      } else {
        console.log('Invalid password!');
        res.send({loggedIn: false, reason: 'Invalid Password'});
      }
    })
    .catch(err => {
      console.log('DB/encryption error', err);
      res.send({loggedIn: false, reason: 'Internal Server Error'});
    });
};


exports.logout = (req, res) => {
  console.log('req.session before destroying:', req.session);
  req.session.destroy();
  console.log('req.session after destroying:', req.session);
  res.redirect('/');
};


exports.checkUser = (req, res, next) => {
  if (req.session.username === undefined) {
    console.log('Not authorized, logging out');
    res.redirect('/login');
  } else {
    console.log(req.session.username, 'authorized');
    next();
  }
};