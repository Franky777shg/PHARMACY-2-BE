const router = require('express').Router()

const { productController } = require('../controllers')
const { uploadp1 } = require('../helpers/multer')
const uploader = uploadp1()

router.post('/get-product', productController.getProduct)
router.post('/filter-product', productController.filterProduct)
router.post('/sort-product', productController.sortProduct)
router.get('/detail-product/:idproduct', productController.detailProduct)
router.post('/add-product1foto', uploader, productController.addProduct1foto)
router.post('/add-product1data', productController.addProduct1data)
router.delete('/del-product1/:idproduct', productController.delProduct1)
router.delete('/del-productr/:idproduct', productController.delProductR)
// router.post('/edit-product/:id', uploader, productController.editProduct)
router.post('/get-productresep', productController.getProductResep)
router.post('/filter-productresep', productController.filterProductResep)
router.post('/sort-productresep', productController.sortProductResep)

module.exports = router
