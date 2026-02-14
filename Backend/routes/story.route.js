const express = require('express');
const router = express.Router()
const multer = require('multer')

const storyController = require('../controllers/story.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({storage:multer.memoryStorage()})

router.post('/addstory',authMiddleware,upload.single("image"),storyController.addStory)
router.get('/:userid',authMiddleware,storyController.getUserStory)
router.get('/',authMiddleware,storyController.getFollowingUserStory)
router.delete('/deletestory/:id',authMiddleware,storyController.deleteStory)


module.exports = router;