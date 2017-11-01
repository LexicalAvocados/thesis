const express = require('express');
const router = require('express').Router();
const testerRoutes = require('./api/tester');
const creatorOptionRoutes = require('./api/creator/option.js');
const creatorSectionRoutes = require('./api/creator/section.js');
const projectRoutes = require('./api/creator/projectRoutes.js');
const sectionRoutes = require('./api/creator/sectionRoutes.js');
const optionRoutes = require('./api/creator/optionRoutes.js');
const frameRoutes = require('./api/creator/frameRoutes.js');
const indexRoutes = require('./api/creator/index.js');
const updateUserRoleRoutes = require('./auth/updateAfterFbSignup');
const detailedDemographicsRoutes = require('./api/creator/detailedDemographicsRoutes.js');
const creditRoutes = require('./api/tester/creditRoutes.js');
const eyeTrackingRoutes = require('./api/creator/eyeTrackingRoutes.js');
const optionHomeUtilityRoutes = require('./api/creator/optionHomeUtilityRoutes.js');
const authRoutes = require('./auth/auth.js');
const AccountInfoRoutes = require('./api/creator/updateAccountInfoRoutes.js');
const FocusGroups = require('./api/creator/focusGroup.js');

router.use('/tester', testerRoutes);

router.use('/option', creatorOptionRoutes);

router.use('/section', creatorSectionRoutes);

router.use('/auth', authRoutes);

router.use('/group', FocusGroups);

router.get('/getProjectsForUser', projectRoutes.getProjectsForUser);

router.get('/getRelatedSections', sectionRoutes.getRelatedSection);

router.post('/addSection', sectionRoutes.addSection);

router.get('/getOptionsForSection', optionRoutes.getRelatedOptions);

router.get('/getTesters', sectionRoutes.getTesters);

router.post('/createProject', projectRoutes.createProject);

router.post('/getFrames', frameRoutes.getRelevantFrames);

router.post('/getFramesBasedOnUserDemographics', frameRoutes.getFramesBasedOnUserDemographics)

router.post('/sendEmails', indexRoutes.sendEmails);

router.post('/getLikes', optionRoutes.getLikesOnOption);

router.get('/getTestersForOption', optionRoutes.getTestersForOption);

router.post('/getUsersIdsWhoWatced', optionRoutes.getUsersIdsWhoWatced);

router.post('/getUsersNamesWhoWatced', optionRoutes.getUsersNamesWhoWatced);

router.post('/addOption', optionRoutes.addOption);

router.post('/updateAfterFb', updateUserRoleRoutes.updateCreatorAfterSignup);

router.post('/creator/newFocusGroup', indexRoutes.createNewFocusGroup);

router.put('/creator/deleteFocusGroup', indexRoutes.deleteFocusGroup);

router.post('/creator/addToFocusGroup', indexRoutes.addTesterToFocusGroup);

router.put('/creator/removeFromFocusGroup', indexRoutes.removeTesterFromFocusGroup);

router.get('/creator/getCreatorFocusGroups', indexRoutes.getCreatorFocusGroups);

router.post('/creator/updateCreatorBio', AccountInfoRoutes.updateCreatorBio);

router.post('/creator/updateCreatorSocial', AccountInfoRoutes.updateCreatorSocial);

router.get('/creator/getUserAgeRange', detailedDemographicsRoutes.getUserAgeRange);

router.get('/creator/getEyeTrackingForOption', eyeTrackingRoutes.getEyeTrackingForOption);

router.get('/getFeedback', optionRoutes.getFeedback);

router.delete('/deleteOption', optionRoutes.deleteOption);

router.delete('/deleteSection', sectionRoutes.deleteSection);

router.delete('/deleteProject', projectRoutes.deleteProject);

router.get('/creator/allNotifications', indexRoutes.getAllNotificationsForUser);

router.get('/updateProject', projectRoutes.updateProject);

router.post('/addCredits', creditRoutes.addCredits);

router.get('/getCreditBalance', creditRoutes.getCreditBalance);

router.post('/depleteCreditBalance', creditRoutes.depleteCreditBalance);

router.post('/addCreditsToOption', creditRoutes.addCreditsToOption);

router.get('/allSponsoredOptions', creditRoutes.allSponsoredOptions);

router.post('/organizeFramesByEmotion', optionHomeUtilityRoutes.organizeFramesByEmotion);

router.post('/calculateCompletionPercentage', optionHomeUtilityRoutes.calculateCompletionPercentage);

router.post('/markNotificationAsSeen', indexRoutes.markNotificationAsSeen);

router.get('/tester/getCreatorData', AccountInfoRoutes.getCreatorDataForPublicProfile);

router.post('/generateAgeRangeObjForUserIdsArray', detailedDemographicsRoutes.generateAgeRangeObjForUserIdsArray);

module.exports = router;
