const express = require('express');
const router  = express.Router();
const commentController = require('../controllers/commentControllers');

router.post('/getComments', commentController.getComments);
router.post('/addComment', commentController.addComment);
router.post('/deleteComment', commentController.deleteComment);
router.post('/editComment', commentController.editComment);


module.exports = router;