const express = require('express');
const db = require('../../../db');
const Sequelize = require('sequelize');
const Option = db.Option;
const User = db.User;
const Frame = db.Frame;
const Key = db.Key;
const OptionAndAnnotation = db.OptionAndAnnotation;
const sequelize = db.sequelize;
const router = express.Router();



router.post('/addAnnotation', (req, res) => {
	console.log(req.body);
	OptionAndAnnotation.findOne({where: {optionId: req.body.option.id, time: req.body.time}})
		.then(anno => {
      if (anno) {
        anno.update({
          emotion: req.body.emotion,
          desc: req.body.desc
        })
      } else {
        OptionAndAnnotation.create({
          optionId: req.body.option.id,
          time: req.body.time,
          emotion: req.body.emotion,
          desc: req.body.desc
        })
      }
    })
})

router.post('/getAllAnnotations', (req, res) => {
  console.log('Get All Annotation', req.body.option);
  OptionAndAnnotation.findAll({where: {optionId: req.body.option.id}})
    .then(data => {
      console.log('ALL DATA', data);
      let result = [];
      data.forEach(elem => {
        result.push(elem.dataValues)
      })
      res.send(result);
    })
})
















module.exports = router;