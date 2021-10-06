const nodemailer = require('nodemailer')
const KEY = process.env.GOOGLE_KEY

//method menerima sebuah object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'csdvfsd@gmail.com',
        pass: KEY
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter