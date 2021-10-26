const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const profileRouter = require('./profileRouter')
const paymentRouter = require('./paymentRouter')
const transactionRouter = require('./transactionRouter')
const userhistoryRouter = require('./userhistoryRouter')
const adminRouter = require('./adminRouter')

module.exports = {
    productRouter,
    userRouter,
    profileRouter,
    transactionRouter,
    userhistoryRouter,
    paymentRouter,
    adminRouter
}