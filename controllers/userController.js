const { db } = require('../database')
const crypto = require('crypto')
const { createToken } = require('../helpers/jwt')
const transporter = require('../helpers/nodemailer')
const { EILSEQ } = require('constants')
const EMAIL = process.env.EMAIL

module.exports = {
    login: (req, res) => {

        const { username, password } = req.body

        const getUser = `select * from user where (username = ${db.escape(username)} or email = ${db.escape(username)}) and password = ${db.escape(password)};`
        console.log(getUser)
        db.query(getUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send('err')
            }

            if (result.length === 0){
                console.log('error')
                res.status(400).send("Username/Password is Invalid!")
            }
            else {
                console.log(result[0])
                let token = createToken({iduser: result[0].iduser})
                // console.log(iduser,token)
                res.status(200).send({dataUser: result[0], token})
                // res.status(200).send(result)
            }
                
        })
    },
    keeplogin: (req,res) => {
        console.log(req.user)
        // const getUser = `select * from users u
        // join profile p
        // on u.idusers = p.idusers
        // where u.idusers =  ${db.escape(req.user.idusers)}`
        const getUser = `select * from user where iduser = ${db.escape(req.user.iduser)}`
        db.query(getUser, (err,result) => {
            if(err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send(result[0])
            console.log(result)
            res.status(200).send(result)
        })
    },
    forgotpw: (req, res) => {
        const { emailuser } = req.body;
        const checkEmail = `select * from user where email = ${db.escape(emailuser)};`
        console.log(checkEmail)
        db.query(checkEmail, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            else if (result.length === 0) {
                res.status(400).send("User with this email does not exists.")
            }
            else if (result.length !== 0) {
                console.log(result)
                // const getUser = `select username from user where email = ${db.escape(email)};`
                // db.query(getUser, (err2, result2) => {
                    // if (err2) {
                    //     console.log(err2)
                    //     res.status(400).send(err2)
                    // }
                    // console.log(result2)
                    let token = createToken({ iduser: result[0].iduser })
                    console.log(token)
                    let info = transporter.sendMail({
                        from: `"ADMIN" <${EMAIL}>`, //sender address
                        to: `${emailuser}`, //list of receivers
                        subject: `Forgot Password`, //Subject line
                        text: `Hello ${result[0].username}`, //plain text body
                        html: `<a href="http://localhost:3000/changepw/${token}">Please click here to reset your password</a>` //html body
                    })
                    .then( res2 => {
                        console.log(res2)
                    })
                    .catch(err3 => {
                        console.log(err3)
                    })
                res.status(200).send('Email has been sent, kindly follow the instructions')
                // })
            }

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
    changepw: (req, res) => {
        console.log(req.user,req.body,req.body.confPass,req.body.newPass)
        const {newPass, confPass} = req.body;
        const updatePw = `UPDATE user SET password = ${db.escape(confPass)} WHERE iduser = ${db.escape(req.user.iduser)};`
        if (newPass === confPass){
            db.query(updatePw, (err,result) => {
                if (err) {
                    console.log(err)
                    res.status(400).send('Reset Password Error')
                 }
               res.status(200).send('Your Password Has Been Changed')
            })
        }
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

                db.query(addQuery, req.body, (err, result) => {
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
                        subject: `Email Verification for ${req.body.username} ✔`, // Subject line
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
    },
    getUserById: (req, res) => {
        let iduser = req.user.iduser
        let getQuery = `select * from user where iduser = ${iduser}`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },
    //edit profile
    updateUser: (req, res) => {
        const updateUser = `update user set ? where iduser = ${req.params.id}`

        db.query(updateUser, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            let getAllUsers = `select * from user where iduser = ${req.params.id}`

            db.query(getAllUsers, (err2, result2) => {
                if (err) {
                    console.log(err2)
                    res.status(400).send(err2)
                }
                res.status(200).send(result2)
            })
        })
    },
}