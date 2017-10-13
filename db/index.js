const Sequelize = require('sequelize');

const sequelize = new Sequelize('reactionsync', 'pengcheng95', 'passwordmajing', {
  host: 'reaction.csm1qfcrhywi.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully with reactionsync');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// ~~~~~~~~~~~ //
// User Schema //
// ~~~~~~~~~~~ //

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  fbId: Sequelize.INTEGER,
  sex: Sequelize.STRING,
  age: Sequelize.INTEGER,
  isCreator: Sequelize.BOOLEAN
});

User.sync({force: false});

// ~~~~~~~~~~~~~~ //
// Project Schema //
// ~~~~~~~~~~~~~~ //

const Project = sequelize.define('project', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});

Project.belongsTo(User);

Project.sync({force: false});

// ~~~~~~~~~~~~~~ //
// Section Schema //
// ~~~~~~~~~~~~~~ //

const Section = sequelize.define('section', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});

Section.belongsTo(Project);

Section.sync({force: false});

// ~~~~~~~~~~~~~ //
// Option Schema //
// ~~~~~~~~~~~~~ //

const Option = sequelize.define('option', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  youtubeUrl: Sequelize.TEXT,
  thumbnail: Sequelize.TEXT,
  length: Sequelize.INTEGER
});

Option.belongsTo(Section);

Option.sync({force: false});

const TesterAndOption = sequelize.define('testerAndOption', {
  like: Sequelize.BOOLEAN
})

Option.belongsToMany(User, {through: 'testerAndOption'});
User.belongsToMany(Option, {through: 'testerAndOption'});

TesterAndOption.sync({force: false});

// ~~~~~~~~~~~~ //
// Frame Schema //
// ~~~~~~~~~~~~ //

const Frame = sequelize.define('frame', {
  time: Sequelize.INTEGER,
  attention: Sequelize.DECIMAL,
  smile: Sequelize.DECIMAL,
  anger: Sequelize.DECIMAL,
  contempt: Sequelize.DECIMAL,
  disgust: Sequelize.DECIMAL,
  fear: Sequelize.DECIMAL,
  happiness: Sequelize.DECIMAL,
  neutral: Sequelize.DECIMAL,
  sadness: Sequelize.DECIMAL,
  surprise: Sequelize.DECIMAL
});

Frame.belongsTo(User);

Frame.belongsTo(Option);

Frame.sync({force: false});

module.exports = {
  sequelize: sequelize,
  User: User,
  Project: Project,
  Section: Section,
  Option: Option,
  Frame: Frame,
  TesterAndOption: TesterAndOption
};
