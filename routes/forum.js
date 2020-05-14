const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.findAllPost);
router.put('/post/new', postController.createPost);
router.delete('/post/:id/', postController.deletePost);
router.get('/post/:id/', postController.getPost);
router.put('/post/:id/', postController.updatePost);

module.exports = router;