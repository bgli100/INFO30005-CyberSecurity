const express = require('express');
const router = express.Router();
const postController = require('../controllers/forum/post');
const ratingController = require('../controllers/forum/rating');

router.get('/', postController.findAllPost);
router.put('/post/new', postController.createPost);
router.delete('/post/:id/', postController.deletePost);
router.get('/post/:id/', postController.getPost);
router.put('/post/:id/', postController.updatePost);

router.get('/post/:id/rating', ratingController.getRating('post'));
router.get('/comment/:id/rating', ratingController.getRating('comment'));
router.put('/post/:id/rating', ratingController.giveRating('post'));
router.put('/comment/:id/rating', ratingController.giveRating('comment'));

module.exports = router;