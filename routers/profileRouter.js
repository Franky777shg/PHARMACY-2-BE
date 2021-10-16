const router = require('express').Router()

const {profileController} = require('../controllers')
const { verifyToken } = require('../helpers/jwt')
const {uploadPhoto} = require('../helpers/multer')
const uploader = uploadPhoto()
const {uploadImageResep} = require('../helpers/multer')
const resep = uploadImageResep()

router.post('/upload', uploader, verifyToken, profileController.uploadPhoto)
router.patch('/delete', verifyToken, profileController.deletePhoto)

router.post('/resepbyid', profileController.getResepById)
router.post('/newdata', profileController.addDataResep)
router.get('/byid/:id', profileController.getById)
router.post('/resep/:id', resep, profileController.uploadResepPic)

module.exports = router