const express = require('express')
const cors = require('cors')
const PORT = 2000
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

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

const { productRouter, userRouter } = require('./routers')
app.use('/product', productRouter)
app.use('/user', userRouter)

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`))