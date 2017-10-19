const express = require('express');
const router = require('express').Router();
const testerRoutes = require('./api/tester');
const creatorOptionRoutes = require('./api/creator/option.js');
const projectRoutes = require('./api/creator/projectRoutes.js')
const sectionRoutes = require('./api/creator/sectionRoutes.js');
const optionRoutes = require('./api/creator/optionRoutes.js');
const frameRoutes = require('./api/creator/frameRoutes.js');
const indexRoutes = require('./api/creator/index.js');
const updateUserRoleRoutes = require('./auth/updateAfterFbSignup');

router.use('/tester', testerRoutes);

router.use('/option', creatorOptionRoutes);

router.get('/getProjectsForUser', projectRoutes.getProjectsForUser);

router.get('/getRelatedSections', sectionRoutes.getRelatedSection);

router.post('/addSection', sectionRoutes.addSection);

router.get('/getOptionsForSection', optionRoutes.getRelatedOptions);

router.get('/getTesters', sectionRoutes.getTesters);

router.post('/createProject', projectRoutes.createProject);

router.post('/getFrames', frameRoutes.getRelevantFrames);

router.post('/sendEmails', indexRoutes.sendEmails);

router.post('/getLikes', optionRoutes.getLikesOnOption);

router.get('/getTestersForOption', optionRoutes.getTestersForOption);

router.post('/getUsersIdsWhoWatced', optionRoutes.getUsersIdsWhoWatced);

router.post('/getUsersNamesWhoWatced', optionRoutes.getUsersNamesWhoWatced);

router.post('/addOption', optionRoutes.addOption);

router.post('/updateAfterFb', updateUserRoleRoutes.updateCreatorAfterSignup)

router.post('/creator/newFocusGroup', indexRoutes.createNewFocusGroup);

router.put('/creator/deleteFocusGroup', indexRoutes.deleteFocusGroup);

router.post('/creator/addToFocusGroup', indexRoutes.addTesterToFocusGroup);

router.put('/creator/removeFromFocusGroup', indexRoutes.removeTesterFromFocusGroup);

module.exports = router;
