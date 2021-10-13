const router = require('express').Router()

const { transactionController } = require('../controllers')
const {verifyToken} = require('../helpers/jwt')
const { uploadp1,uploadpr } = require('../helpers/multer')
const uploader = uploadp1()
const uploader1 = uploadpr()

router.post('/push-cart/:iduser', transactionController.pushCart)
// router.get('/userbyid',verifyToken, userController.getUserById)

module.exports = router
