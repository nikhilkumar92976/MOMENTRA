const express = require('express')
const router = express.Router()
const multer = require('multer')

const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({storage:multer.memoryStorage()})



router.post('/createAccount',authController.createAccount)
router.post('/login',authController.login)
router.post('/logout',authMiddleware,authController.logout)
router.patch('/updatepassword',authMiddleware,authController.updatePassword)
router.delete('/deteteaccount',authMiddleware,authController.deleteAccount)
router.patch('/update-user-profile',authMiddleware,upload.single("image"),authController.updateUserProfile)
router.get('/profile/:id',authMiddleware,authController.getProfile)


module.exports = router;