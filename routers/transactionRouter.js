const router = require('express').Router()

const { transactionController } = require('../controllers')
const {verifyToken} = require('../helpers/jwt')
const { uploadp1,uploadpr } = require('../helpers/multer')
const uploader = uploadp1()
const uploader1 = uploadpr()

router.patch('/add-cart/:iduser', transactionController.addCart)
router.post('/addnew-cart/:iduser', transactionController.addNewCart)
router.get('/get-cart/:iduser', transactionController.getCartUser)
router.post('/push-cart/:iduser', transactionController.pushCart)
router.patch('/delrow-cart/:idProdCart', transactionController.deleterowCart)
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
router.patch('/addqty-cart/:iduser', transactionController.addqtyCart)
router.post('/post-history/:iduser', transactionController.posthistory)
// router.get('/get-history/:iduser', transactionController.gethistory)
router.post('/getDetailOrderSatuan', transactionController.getDetailOrderSatuan)
router.get('/get-cartqty/:iduser', transactionController.getCartQty)

module.exports = router
