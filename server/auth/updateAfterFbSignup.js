const express = require('express');
const router = require('express').Router();
const db = require('../../db/index.js');
const User = db.User;

exports.updateCreatorAfterSignup = (req, res) => {
  console.log('request to update user', req.body)
  var newUsername = req.body.newUsername;
  var newIsCreator = req.body.newIsCreator;
  User.update(
    {isCreator: newIsCreator},
    {where: {username: newUsername}}
  )
  .then(() => {
    return User.findOne({
      where: {username: newUsername}
    })
  })
  .then( (newUserObj) => {
    // console.log('updated userObj', newUserObj);
    res.send(JSON.stringify(newUserObj))
  })
  .catch( (err) => console.error('error updating user creator status'))
};
