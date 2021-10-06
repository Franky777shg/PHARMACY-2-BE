const nodemailer = require('nodemailer')
const KEY = process.env.GOOGLE_KEY
const EMAIL = process.env.EMAIL
//method menerima sebuah object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${EMAIL}`,
        pass: KEY
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter