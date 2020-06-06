const express = require('express');
const router = express.Router();
const postController = require('../controllers/forum/post');
const ratingController = require('../controllers/forum/rating');
const commentController = require('../controllers/forum/comment');
const indexController = require('../controllers/forum/index');

//render index page of forum
router.get('/', indexController.indexPage);
//render post page
router.get('/post/:id/content', indexController.postPage);

// create comment
router.put('/post/:id/comment', commentController.createComment);
// get all posts
router.get('/all', postController.findAllPost);

// create post
router.put('/post', postController.createPost);

// delete post
router.delete('/post/:id', postController.deletePost);

// get post
router.get('/post/:id', postController.getPost);

//update the post
router.put('/post/:id', postController.updatePost);

router.get('/post/:id/rating', ratingController.getRating('post'));
router.get('/post/:postId/comment/:id/rating', ratingController.getRating('comment'));
router.put('/post/:id/rating', ratingController.giveRating('post'));
router.put('/post/:postId/comment/:id/rating', ratingController.giveRating('comment'));

router.put('/post/:postId/comment/:id', commentController.updateComment);
router.delete('/post/:postId/comment/:id', commentController.deleteComment);

module.exports = router;