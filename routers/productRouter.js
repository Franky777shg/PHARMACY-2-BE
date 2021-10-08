const router = require('express').Router()

const { productController } = require('../controllers')
const { upload } = require('../helpers/multer')
const uploader = upload()

router.post('/get-product', productController.getProduct)
router.post('/filter-product', productController.filterProduct)
router.post('/sort-product', productController.sortProduct)
router.get('/detail-product/:idproduct', productController.detailProduct)
router.post('/add-product1', uploader, productController.addProduct1)
router.post('/add-productr', uploader, productController.addProductR)
// router.post('/edit-product/:id', uploader, productController.editProduct)
module.exports = router





