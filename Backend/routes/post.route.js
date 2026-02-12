const express = require('express')
const router = express.Router()
const multer = require('multer')

const postController = require('../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({storage:multer.memoryStorage()})

router.post('/createpost',authMiddleware,upload.single("image"),postController.createPost)
router.delete('/deletepost/:id',authMiddleware,postController.deletePost)
router.patch('/update-post/:id',authMiddleware,postController.updatePost)
router.get('/get-user-allpost/:id',authMiddleware,postController.getUserAllPost)

module.exports = router;