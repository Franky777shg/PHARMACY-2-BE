const router = require('express').Router()

const {paymentController} = require('../controllers')
const {uploadPaymentResep} = require('../helpers/multer')
const paymentRes = uploadPaymentResep()


router.post('/newdatapayment', paymentController.addDataPayment) //ok
router.post('/imgpayresep/:id', paymentRes, paymentController.uploadPaymentResep) //ok
router.post('/paymentbyid', paymentController.getPaymentById) 
router.post('/paymentparams/:id', paymentController.getPaymentById2) //ok


router.get('/allpayment', paymentController.getAllPaymentResep) //ok



module.exports = router