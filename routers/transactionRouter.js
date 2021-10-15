const router = require('express').Router()

const { transactionController } = require('../controllers')
const {verifyToken} = require('../helpers/jwt')
const { uploadp1,uploadpr } = require('../helpers/multer')
const uploader = uploadp1()
const uploader1 = uploadpr()

router.patch('/add-cart/:iduser', transactionController.addCart)
router.patch('/addnew-cart/:iduser', transactionController.addNewCart)
router.get('/get-cart/:iduser', transactionController.getCartUser)

module.exports = router
