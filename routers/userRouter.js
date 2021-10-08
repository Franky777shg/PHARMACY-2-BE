const router = require('express').Router()

const { userController } = require('../controllers')
const {verifyToken} = require('../helpers/jwt')

router.post('/login', userController.login)
router.post('/forgotpw', userController.forgotpw)
router.post('/changepw',verifyToken, userController.changepw)
router.get('/regis', userController.getRegister)
router.post('/addUser', userController.addUser)
router.post('/keeplogin', verifyToken, userController.keeplogin)
router.post('/verification', verifyToken, userController.verification)
router.get('/userbyid/:id', userController.getUserById)
router.patch('/edituser/:id', userController.updateUser)

module.exports = router