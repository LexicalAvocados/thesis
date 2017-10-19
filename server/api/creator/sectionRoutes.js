const db = require('../../../db/index.js');
const Sections = db.Section;
const Users = db.User;

exports.getRelatedSection = function(req, res) {
  Sections.findAll({
    where: {
      projectId: req.query.projectId
    }
  })
    .then((sectionsArray) => {
      res.send(sectionsArray);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getTesters = function(req, res) {
  Users.findAll({
    where: {
      isCreator: false
    }
  })
    .then((testers) => {
      res.send(testers);
    })
    .catch((err) => {
      res.send('Error retrieving testers!', err);
    });
};

exports.addSection = function(req, res) {
  Sections.create({
    name: req.body.name,
    description: req.body.description,
    projectId: req.body.projectId
  })
    .then((newSection) => {
      if (newSection) {
        res.send(newSection);
      } else {
        console.error('Could not create new section');
      }
    })
    .catch((err) => {
      console.error('Error creating new section', err);
    });
};


