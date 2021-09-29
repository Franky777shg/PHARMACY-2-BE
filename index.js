const express = require('express')
const cors = require('cors')
const PORT = 2000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the Pharmacy!</h1>')
})

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`))