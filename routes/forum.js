const express = require('express');
const router = express.Router();
const postController = require('../controllers/forum/post');
const ratingController = require('../controllers/forum/rating');
const commentController = require('../controllers/forum/comment');
const indexController = require('../controllers/forum/index');

//renderPages 
router.get('/', indexController.indexPage);
router.get('/post/:id/content', indexController.postPage);


router.put('/post/:id/comment', commentController.createComment);

router.get('/all', postController.findAllPost);
router.put('/post', postController.createPost);
router.delete('/post/:id', postController.deletePost);
router.get('/post/:id', postController.getPost);
router.put('/post/:id', postController.updatePost);

router.get('/post/:id/rating', ratingController.getRating('post'));
router.get('/post/:postId/comment/:id/rating', ratingController.getRating('comment'));
router.put('/post/:id/rating', ratingController.giveRating('post'));
router.put('/post/:postId/comment/:id/rating', ratingController.giveRating('comment'));

router.put('/post/:postId/comment/:id', commentController.updateComment);
router.delete('/post/:postId/comment/:id', commentController.deleteComment);

module.exports = router;