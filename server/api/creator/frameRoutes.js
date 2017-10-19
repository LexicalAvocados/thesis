const db = require('../../../db/index.js');
const Frame = db.Frame;

exports.getRelevantFrames = (req, res) => {
  Frame.findAll({
    where: {
      optionId: req.body.optionId
    }
  })
    .then((optionsArray) => {
      res.send(optionsArray);
    })
    .catch((err) => {
      res.send('Error retrieving options!');
    })
};
