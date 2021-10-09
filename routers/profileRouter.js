const router = require('express').Router()

const {profileController} = require('../controllers')
const { verifyToken } = require('../helpers/jwt')
const {uploadPhoto} = require('../helpers/multer')
const uploader = uploadPhoto()

router.post('/upload', uploader, verifyToken, profileController.uploadPhoto)
router.patch('/delete', verifyToken, profileController.deletePhoto)

module.exports = router
