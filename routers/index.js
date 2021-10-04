// const { productRouter, userRouter } = require('./routers')
// app.use('/product', productRouter)
// app.use('/user', userRouter)

const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
// const profileRouter = require('./profileRouter')

module.exports = {
    productRouter,
    userRouter
    // profileRouter
}