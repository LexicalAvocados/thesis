const db = require('../../../db/index.js');
const User = db.User;
const FocusGroup = db.FocusGroup;
const FocusGroupAndTester = db.FocusGroupAndTester;
const TesterAndOptions = db.TesterAndOption;
const nodemailer = require('nodemailer');

const routeForTesters = "http://localhost:3000/login"


exports.sendEmails = function(req, res) {
  console.log('within emails', req.body);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "reactionsyncer@gmail.com",
      pass: "reactionsync1"
    }
  });


  // var remainder = req.body.invitedArr.length % req.body.options.length;
  req.body.options.forEach((option) => {
    for (var i = 0; i < Math.floor(req.body.invitedArr.length/req.body.options.length); i++) {
      TesterAndOptions.create({
        optionId: option.id,
        userId: req.body.invitedArr[i].id
      });      
      let mailOptions = {
        from: "ReactionSync",
        to: req.body.invitedArr[i].email,
        subject: "You've been invited!",
        text: "Guten Tag! You've been invited to something (if you've received this email)",
        html: `<p>Herzlich Willkommen! You've been invitied to participate in a nefarious study! Please enter promo code ${option.id} at ${routeForTesters} after logging in! Giddy up!</p>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // return console.log(error);
          res.send('FAILURE');
        } else {
          console.log('I think the email was sent.', info);
          res.send('Success');
        }
      });

    }
  });
};


exports.createNewFocusGroup = (req, res) => {
  console.log('createNewFocusGroup req.body:', req.body);
  User.findOne({
    where: {
      username: req.body.creatorUsername
    }
  })
    .then(creator => {
      return FocusGroup.create({
        name: req.body.focusGroupName,
        userId: creator.id
      });
    })
    .then(newFocusGroup => {
      console.log('New Focus Group created:', newFocusGroup);
      res.send(newFocusGroup.dataValues);
    })
    .catch(err => {
      console.log('Error creating new Focus Group');
      res.send(err);
    });
};


exports.deleteFocusGroup = (req, res) => {
  console.log('deleteFocusGroup req.body:', req.body);
  User.findOne({
    where: {
      username: req.body.creatorUsername
    }
  })
    .then(creator => {
      return FocusGroup.destroy({
        name: req.body.focusGroupName,
        creatorId: creator.id
      });
    })
    .then(numOfDeletedRows => {
      console.log('numOfDeletedRows:', numOfDeletedRows);
      if (numOfDeletedRows === 1) res.send(true);
      else res.send(false);
    })
    .catch(err => {
      console.log('Error deleting Focus Group');
      res.send(err);
    });  
};


exports.addTesterToFocusGroup = (req, res) => {
  console.log('addTesterToFocusGroup req.body:', req.body);

  let tester = User.findOne({
    where: {
      username: req.body.testerUsername
    }
  });

  let focusGroup = FocusGroup.findOne({
    where: {
      name: req.body.focusGroupName
    }
  });

  Promise.all([tester, focusGroup])
    .then(values => {
      return FocusGroupAndTester.create({
        userId: values[0].id,
        focusGroupId: values[1].id
      });
    })
    .then(newDbEntry => {
      console.log('Associated', newDbEntry.userId, 'with Focus Group', newDbEntry.focusGroupId);
      res.send(true);
    })
    .catch(err => {
      console.log('Error associating Tester with Focus Group:', err);
      res.send(false);
    })
};


exports.removeTesterFromFocusGroup = (req, res) => {
  console.log('removeTesterFromFocusGroup req.body:', req.body);

  let tester = User.findOne({
    where: {
      username: req.body.testerUsername
    }
  });

  let focusGroup = FocusGroup.findOne({
    where: {
      name: req.body.focusGroupName
    }
  });

  Promise.all([tester, focusGroup])
    .then(values => {
      console.log('values:', values);
      return FocusGroupAndTester.destroy({
        where: {
          userId: values[0].id,
          focusGroupId: values[1].id
        }
      });
    })
    .then(numOfDeletedRows => {
      console.log('numOfDeletedRows:', numOfDeletedRows);
      if (numOfDeletedRows === 1) res.send(true);
      else res.send(false);
    })
    .catch(err => {
      res.send(err);
    });
};