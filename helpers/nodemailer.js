const nodemailer = require('nodemailer')
const KEY = process.env.GOOGLE_KEY
const EMAIL = process.env.EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${EMAIL}`, // generated ethereal user
        pass: KEY, // generated ethereal password
    },
    tls: {
        rejectUnauthorized : true
    }
});

//nodemailer sebagai perantara untuk admin bisa ngirim ke user

module.exports = transporter