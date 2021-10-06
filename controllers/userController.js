const { db } = require('../database')
const crypto = require('crypto')
const {createToken} = require('../helpers/jwt')
const transporter = require('../helpers/nodemailer')
const EMAIL = process.env.EMAIL

module.exports = {
    login: (req, res) => {

        const { username, password } = req.body

        const getUser = `select * from user where (username = ${db.escape(username)} or email = ${db.escape(username)}) and password = ${db.escape(password)};`
        console.log(getUser)
        db.query(getUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // console.log(result[0])
            // let token = createToken({idusers: result[0].idusers})
            // console.log(idusers,token)
            // res.status(200).send({dataUser: result[0], token})
            res.status(200).send(result)
        })
    },

    getRegister: (req, res) => {
        let getQuery = `select * from user;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },

    addUser: (req, res) => {
        const { username, email, password, fullname, gender, address, age, role, profile_picture, verify } = req.body

        // req.body.password = crypto.createHmac('sha1', 'hash17').update(req.body.password).digest('hex')
        // hash password di registrasi --> login juga harus di hash biar bisa masuk
        // res.status(200).send(req.body)

        const checkUser = `select * from user where username = ${db.escape(username)};`

        db.query(checkUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            } else if (result.length !== 0) {
                res.status(400).send('Username already used!')
            } else if (result.length === 0) {

                let addQuery = `insert into user (username, email, password, fullname, gender, address, age, role, profile_picture, verify)
                values (${db.escape(username)}, ${db.escape(email)}, ${db.escape(password)}, ${db.escape(fullname)}, ${db.escape(gender)}, ${db.escape(address)}, ${db.escape(age)}, ${db.escape(role)}, ${db.escape(profile_picture)}, ${db.escape(verify)});`

                // `insert into users set ?` otomatis tanpa sepanjang diatas

                db.query(addQuery,req.body, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
                    console.log(result)

                    //buat token 
                    let token = createToken({
                        iduser: result.insertId
                    })
                    console.log(token)

                    //kirim email verivikasi
                    let info = transporter.sendMail({
                        from: `"ADMIN" <${EMAIL}>`, // sender address
                        to: `${req.body.email}`, // list of receivers
                        subject: `Email Verivication for ${req.body.username} ✔`, // Subject line
                        text: `Hello ${req.body.username}`, // plain text body
                        html: `<a href="http://localhost:3000/verification/${token}" > Click here to verify Your Account</a>`, // html body
                    });

                    res.status(200).send(req.body)
                })

            }
        })
        
    },
    verification: (req, res) => {
        console.log(req.user)
        const updateUser = `update user set verify = 'verified' where iduser = ${db.escape(req.user.iduser)};`

        db.query(updateUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            console.log(result)
            res.status(200).send(result)
        })
    }
}