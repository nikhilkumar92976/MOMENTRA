const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

const socalActivityController = require('../controllers/socalActivity.controller')

router.get('/getallpost',authMiddleware,socalActivityController.getAllPost)
router.get('/get-user-by-postid/:id',authMiddleware,socalActivityController.getUserByPost)
router.post('/like/:id',authMiddleware,socalActivityController.likePost)
router.post('/comment/:id',authMiddleware,socalActivityController.commentPost)
router.post('/:postId/deletecomment/:commentId',authMiddleware,socalActivityController.deleteComment)
router.post('/follow/:id',authMiddleware,socalActivityController.followUser)
router.get('/notification',authMiddleware,socalActivityController.getNotification)
router.delete('/notification/:id',authMiddleware,socalActivityController.deleteNotification)

module.exports = router;