const router = require('express').Router()

const { productController } = require('../controllers')
const { uploadPhoto } = require('../helpers/multer')
const uploader = uploadPhoto()

router.post('/get-product', productController.getProduct)
router.post('/filter-product', productController.filterProduct)
router.post('/sort-product', productController.sortProduct)
router.get('/detail-product/:idproduct', productController.detailProduct)
// router.post('/add-product1', uploader, productController.addProduct1)
// router.post('/add-productr', uploader, productController.addProductR)
// router.post('/edit-product/:id', uploader, productController.editProduct)
router.post('/get-productresep', productController.getProductResep)
router.post('/filter-productresep', productController.filterProductResep)
router.post('/sort-productresep', productController.sortProductResep)

module.exports = router
