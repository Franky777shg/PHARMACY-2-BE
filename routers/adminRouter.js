const router = require('express').Router()

const {adminController} = require('../controllers')

router.post('/order-resep', adminController.getTransaksiResep)
router.post('/order-satuan', adminController.getTransaksiSatuan)
router.post('/filter-resep', adminController.filterTransByResep)
router.post('/filter-satuan', adminController.filterTransBySatuan)
router.post('/reven-resep', adminController.revenueResep)
router.post('/reven-satuan', adminController.revenueSatuan)
router.post('/total-revresep', adminController.totalRevenueResep)
router.post('/total-revsatuan', adminController.totalRevenueSatuan)

//REVENUE-resep-perbulan
router.post('/reven-july', adminController.revenueResJuly)
router.post('/total-revjuly', adminController.totalRevResJuly)

//REVENUE-satuan-perbulan
router.post('/satuan-july', adminController.revenueSatJuly)
router.post('/total-satjuly', adminController.totalRevSatJuly)


module.exports = router