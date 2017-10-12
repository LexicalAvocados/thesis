const express = require('express');
const router = require('express').Router();
const db = require('../../../db/index.js');
const Users = db.User;
const Projects = db.Project;

exports.getProjectsForUser = function(req, res) { 
  // Incase not given id. 
  Users.findOne({ 
    where: {
      username: req.query.username
    }
  })
    .then((user) => {
      Projects.findAll({
        where: {
          id: user.id
        }
      })
        .then((projects) => {
          res.send(projects);
        })
        .catch((err) => { 
          console.log('Error finding projects associated with the user', err);
        })
    })
    .catch((err) => {
      console.log('Error retrieving user from db', err);
      res.send(err);
    })
};