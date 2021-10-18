const router = require('express').Router()

const {adminController} = require('../controllers')

router.post('/order-resep', adminController.getTransaksiResep)
router.post('/order-satuan', adminController.getTransaksiSatuan)
router.post('/filter-resep', adminController.filterTransByResep)
router.post('/filter-satuan', adminController.filterTransBySatuan)

module.exports = router