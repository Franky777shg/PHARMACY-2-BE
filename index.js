const express = require('express')
const cors = require('cors')
const PORT = 2000
require('dotenv').config()
const bearerToken = require('express-bearer-token')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bearerToken())
app.use(express.static('./public'))

// Connect Database
const { db } = require('./database')

db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.message);
        return;
    }

    console.log('connected to MySQL as id ' + db.threadId);
});

// API
app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the Pharmacy!</h1>')
})

const { productRouter, userRouter, profileRouter, transactionRouter } = require('./routers')
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/transaction', transactionRouter)

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`))