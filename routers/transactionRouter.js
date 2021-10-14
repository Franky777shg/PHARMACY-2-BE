const router = require('express').Router()

const { transactionController } = require('../controllers')
const {verifyToken} = require('../helpers/jwt')
const { uploadp1,uploadpr } = require('../helpers/multer')
const uploader = uploadp1()
const uploader1 = uploadpr()

router.post('/push-cart/:iduser', transactionController.pushCart)
// router.get('/userbyid',verifyToken, userController.getUserById)
router.get('/getTransOROnGoing', transactionController.getTransaksiObtResepOnGoing)
router.get('/getTransORComplete', transactionController.getTransaksiObtResepComplete)
router.get('/getTransORCancel', transactionController.getTransaksiObtResepCancel)
router.post('/getDataOrder', transactionController.getDataOrder)
router.post('/cariBahan', transactionController.cariBahan)
router.post('/pilihBahan', transactionController.pilihBahanResep)
router.post('/addOrderDetailResep', transactionController.addToOrderDetailResep)
router.post('/updateStokResep', transactionController.updateStokResep)
router.post('/updateStatusResep', transactionController.updateStatusResep)
router.post('/rejectTransactionResep', transactionController.rejectTransactionResep)
router.post('/getDetailOrderResep', transactionController.getDetailOrderResep)
router.post('/getImageBuktiPembayaranResep', transactionController.getImageBuktiPembayaranResep)

module.exports = router
