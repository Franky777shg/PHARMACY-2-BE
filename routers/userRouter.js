const router = require('express').Router()

const { userController } = require('../controllers')

router.post('/login', userController.login)
router.post('/forgotpw', userController.forgotpw)
router.put('/changepw', userController.changepw)
router.get('/regis', userController.getRegister)
router.post('/addUser', userController.addUser)

module.exports = router