const router = require('express').Router()

const { productController } = require('../controllers')

router.post('/get-product', productController.getProduct)

module.exports = router