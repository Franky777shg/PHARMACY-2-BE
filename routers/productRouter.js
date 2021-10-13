const router = require('express').Router()

const { productController } = require('../controllers')
const { uploadp1,uploadpr } = require('../helpers/multer')
const uploader = uploadp1()
const uploader1 = uploadpr()

router.post('/get-product', productController.getProduct)
router.post('/filter-product', productController.filterProduct)
router.post('/sort-product', productController.sortProduct)
router.get('/detail-product/:idproduct', productController.detailProduct)
router.get('/detail-productr/:idproduct', productController.detailProductresep)
router.post('/add-product1foto', uploader, productController.addProduct1foto)
router.post('/add-product1data', productController.addProduct1data)
router.post('/add-productrfoto', uploader1, productController.addProductRfoto)
router.post('/add-productrdata', productController.addProductRdata)
router.delete('/del-product1/:idproduct', productController.delProduct1)
router.delete('/del-productr/:idproduct', productController.delProductR)
router.post('/edit-product1data/:idproduct', productController.editProduct1data)
router.post('/edit-product1foto/:idproduct',uploader, productController.editProduct1foto)
router.post('/edit-productr/:id', productController.editProductRdata)
router.post('/edit-productr/:id', uploader1, productController.editProductRfoto)
router.post('/get-productresep', productController.getProductResep)
router.post('/filter-productresep', productController.filterProductResep)
router.post('/sort-productresep', productController.sortProductResep)

module.exports = router
