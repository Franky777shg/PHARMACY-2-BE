const router = require('express').Router()

const { productController } = require('../controllers')

router.post('/get-product', productController.getProduct)
router.post('/filter-product', productController.filterProduct)

module.exports = router