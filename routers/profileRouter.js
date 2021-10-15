const router = require('express').Router()

const {profileController} = require('../controllers')
const { verifyToken } = require('../helpers/jwt')
const {uploadPhoto} = require('../helpers/multer')
const uploader = uploadPhoto()
const {uploadImageResep} = require('../helpers/multer')
const resep = uploadImageResep()

router.post('/upload', uploader, verifyToken, profileController.uploadPhoto)
router.patch('/delete', verifyToken, profileController.deletePhoto)

router.get('/dataresep', profileController.getResep)
router.get('/resepbyid', profileController.getResepById)
router.post('/resep/:id', resep, profileController.uploadResep)

router.patch('/updateresep/:id', profileController.updateResep)
router.post('/newdata', profileController.addDataResep)

module.exports = router