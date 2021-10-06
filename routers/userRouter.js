const router = require('express').Router()
const {verifyToken} = require('../helpers/jwt')

const { userController } = require('../controllers')

router.post('/login', userController.login)
router.get('/regis', userController.getRegister)
router.post('/addUser', userController.addUser)
router.post('/verification', verifyToken, userController.verification)

module.exports = router