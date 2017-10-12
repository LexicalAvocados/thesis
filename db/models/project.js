const Sequelize = require('sequelize');
const sequelize = require('../index.js');
const User = require('./user.js');


const Project = sequelize.define('project', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});

Project.belongsTo(User);

Project.sync({force: false});

module.exports = Project;
