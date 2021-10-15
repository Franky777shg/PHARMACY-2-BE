const router = require('express').Router()

const {paymentController} = require('../controllers')
const {uploadPaymentResep} = require('../helpers/multer')
const paymentRes = uploadPaymentResep()

router.get('/allpayment', paymentController.getAllPaymentResep) //ok
router.post('/newdatapayment', paymentController.addDataPayment) //ok
router.post('/paymentbyid/:id', paymentController.getPaymentById) //ok
router.post('/imgpayresep', paymentRes, paymentController.uploadPaymentResep) //ok


module.exports = router