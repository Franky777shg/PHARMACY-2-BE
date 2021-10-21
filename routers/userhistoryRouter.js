const router = require('express').Router()

const { userhistoryController } = require('../controllers')
const { uploadp1,uploadpr,uploadPaymentSatuan } = require('../helpers/multer')
const uploader = uploadp1()
const uploader1 = uploadpr()
const uploaderpmt = uploadPaymentSatuan()

router.post('/og-wfp/:iduser', userhistoryController.OGWaitingforPayment)
router.post('/og-wfpa/:iduser', userhistoryController.getOGWaitingForPaymentApproval)
router.post('/og-process/:iduser', userhistoryController.getOGProcessing)
router.post('/og-sendp/:iduser', userhistoryController.getOGSendingP)
router.post('/og-hist/:iduser', userhistoryController.getOGHist)
router.post('/h-complete/:iduser', userhistoryController.getHistoryComplete)
router.get('/get-ongoing/:iduser', userhistoryController.getonGoing)
router.get('/get-history/:iduser', userhistoryController.getHistory)
router.post('/upload-pmt/:iduser', uploaderpmt, userhistoryController.uploadpmt)
router.post('/get-totalbayar/:iduser', userhistoryController.gettotalBayar)
router.post('/post-pmt/:iduser', userhistoryController.postpmt)

module.exports = router
