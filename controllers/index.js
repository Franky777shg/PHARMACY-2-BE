const productController = require("./productController");
const userController = require('./userController');
const profileController = require('./profileController')
const paymentController = require('./paymentController')
const transactionController = require('./transactionController')
const userhistoryController = require('./userhistoryController')
const adminController = require('./adminController')

module.exports = {
    productController,
    userController,
    profileController,
    transactionController,
    userhistoryController,
    paymentController,
    adminController
}