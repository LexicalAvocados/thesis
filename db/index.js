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
  fbId: Sequelize.STRING,
  name: Sequelize.STRING,
  sex: Sequelize.STRING,
  age: Sequelize.INTEGER,
  race: Sequelize.STRING,
  isCreator: {type: Sequelize.BOOLEAN, defaultValue: false},
  likes: Sequelize.ARRAY(Sequelize.TEXT),
  movies: Sequelize.ARRAY(Sequelize.TEXT),
  music: Sequelize.ARRAY(Sequelize.TEXT),
  books: Sequelize.ARRAY(Sequelize.TEXT),
  television: Sequelize.ARRAY(Sequelize.TEXT)
});

User.sync({force: false});

// ~~~~~~~~~~~~~~~~~~ //
// Focus Group Schema //
// ~~~~~~~~~~~~~~~~~~ //

const FocusGroup = sequelize.define('focusGroup', {
  name: Sequelize.STRING
});

FocusGroup.belongsTo(User);

FocusGroup.sync({force: false});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Focus Group / Tester Schema //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const FocusGroupAndTester = sequelize.define('focusGroupAndTester', {
});

FocusGroup.belongsToMany(User, {through: 'focusGroupAndTester'});
User.belongsToMany(FocusGroup, {through: 'focusGroupAndTester'});

FocusGroupAndTester.sync({force: false});

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

// ~~~~~~~~~~~~~~~~~~~~~~ //
// Annotation / Option Schema //
// ~~~~~~~~~~~~~~~~~~~~~~ //

const OptionAndAnnotation = sequelize.define('optionAndAnnotation', {
  time: Sequelize.INTEGER,
  emotion: Sequelize.TEXT,
  desc: Sequelize.TEXT
})

OptionAndAnnotation.belongsTo(Option);

OptionAndAnnotation.sync({force: false});


// ~~~~~~~~~~~~~~~~~~~~~~ //
// Tester / Option Schema //
// ~~~~~~~~~~~~~~~~~~~~~~ //

const TesterAndOption = sequelize.define('testerAndOption', {
  like: Sequelize.BOOLEAN,
  finished: Sequelize.BOOLEAN,
  comment: Sequelize.TEXT
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

// ~~~~~~~~~~ //
// Key Schema //
// ~~~~~~~~~~ //

const Key = sequelize.define('key', {
  key: Sequelize.TEXT
});

Key.sync({force: false});



// Key.create({key: 'cb1e44a3d50c4a5291591ca117880155'})

module.exports = {
  sequelize,
  User,
  FocusGroup,
  FocusGroupAndTester,
  Project,
  Section,
  Option,
  Frame,
  TesterAndOption,
  OptionAndAnnotation,
  Key
};
