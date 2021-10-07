const router = require('express').Router()

const { userController } = require('../controllers')
const {verifyToken} = require('../helpers/jwt')

router.post('/login', userController.login)
router.post('/forgotpw', userController.forgotpw)
router.post('/changepw',verifyToken, userController.changepw)
router.get('/regis', userController.getRegister)
router.post('/addUser', userController.addUser)
// router.post('/keeplogin/:id', verifyToken, userController.keeplogin)
router.post('/verification', verifyToken, userController.verification)

module.exports = router