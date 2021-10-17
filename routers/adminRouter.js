const router = require('express').Router()

const {adminController} = require('../controllers')

router.post('/order-resep', adminController.getTransaksiResep)
router.post('/order-satuan', adminController.getTransaksiSatuan)

module.exports = router