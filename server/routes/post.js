const express = require('express');
const router  = express.Router();
const postController = require('../controllers/postControllers');

router.post('/getPosts', postController.getPosts);
router.post('/addPost', postController.addPost);
router.post('/deletePost', postController.deletePost);
router.post('/editPost', postController.editPost);


module.exports = router;