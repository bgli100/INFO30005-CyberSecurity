const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/user');

//renderPages 
router.get('/', userController.indexPage);

//RestfulAPI
router.put('/', userController.verifyLogin);
router.put('/signup', userController.signup);
router.get('/checkcookie', userController.checkCookie);
router.get('/logout', userController.logout);
router.get('/:id', userController.getProfile);
router.post('/:id', userController.updateProfile);
router.get('/:id/comments', userController.getCommentsByUser);
router.get('/:id/posts', userController.getPostsByUser);
module.exports = router;