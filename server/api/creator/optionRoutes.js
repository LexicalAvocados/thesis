const db = require('../../../db/index.js');
const Options = db.Option;
const Likes = db.TesterAndOption;
const Users = db.User;


exports.getRelatedOptions = (req, res) => {
  Options.findAll({
    where: {
      sectionId: req.query.sectionId
    }
  })
    .then((optionsArray) => {
      res.send(optionsArray);
    })
    .catch((err) => {
      res.send('Error retrieving options!');
    })
};

exports.getLikesOnOption = (req, res) => {
    Likes.findAll({
      where: {
        optionId: req.body.optionId
      }
    })
    .then((likes) => {
      console.log('All likes', likes)
      res.send(likes)
    })
    .catch((err) => {
      res.send('Error retrieving Like on this option/user combo!')
    })
};

exports.getUsersIdsWhoWatced = (req, res) => {
   Likes.findAll({
    attributes: ['userId'],
    where: {
      optionId: req.body.optionId
    }
  })
  .then( (usersIdsArr) => {
      res.send(JSON.stringify(usersIdsArr));
    })
  .catch((err) => console.error('err in getting userids', err))
};

exports.getUsersNamesWhoWatced = (req, res) => {
   Users.findAll({
    where: {
      id: req.body.userId
    }
  })
  .then( (userObj) => {
    res.send(JSON.stringify(userObj));
  })
  .catch((err) => console.error('err in getting usernames', err))
}

// I've sent all the options associated with that section

exports.getTestersForOption = (req, res) => {
  Likes.findAll({
    where: {
      optionId: req.query.optionId
    }
  })
    .then((options) => {
      let userIds = options.map((option) => {
        return option.userId;
      })
      res.send(userIds);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addOption = (req, res) => {
  Options.create({
    name: req.body.name,
    description: req.body.description,
    sectionId: req.body.sectionId,
    youtubeUrl: req.body.url,
    thumbnail: req.body.thumbnail,
    length: req.body.length
    // tags: req.body.tags
  })
    .then((newOption) => {
      if (newOption) {
        res.send(newOption);
      }
    })
    .catch((err) => {
      console.error('Error creating new option', err);
    });
};

