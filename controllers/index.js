const productController = require("./productController");
const userController = require('./userController');
const profileController = require('./profileController')
const paymentController = require('./paymentController')
const transactionController = require('./transactionController')
const adminController = require('./adminController')


module.exports = {
    productController,
    userController,
    profileController,
    paymentController,
    transactionController,
    adminController
}