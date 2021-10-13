const router = require('express').Router()

const { transactionController } = require('../controllers')

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

module.exports = router