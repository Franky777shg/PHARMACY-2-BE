const { db } = require('../database')
const { createToken } = require('../helpers/jwt')
let transporter = require('../helpers/nodemailer')

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
    forgotpw: (req, res) => {
        const { email } = req.body;
        const checkEmail = `select * from user where email = ${db.escape(email)};`
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
                        from: '"ADMIN" <csdvfsd@gmail.com>', //sender address
                        to: `${email}`, //list of receivers
                        subject: `Forget Password`, //Subject line
                        text: `Hello ${result[0].username}`, //plain text body
                        html: `<a href="http://localhost:3000/forgetpw/${token}">Please click here to reset your password</a>` //html body
                    })
                    .then( res2 => {
                        console.log(res2)
                    })
                    .catch( err3 => {
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
    },
    addUser : (req, res) => {
        const { username, email, password, fullname, gender, address, age, role, profile_picture, verify} = req.body

        let addQuery = `insert into user (username, email, password, fullname, gender, address, age, role, profile_picture, verify)
        values (${db.escape(username)}, ${db.escape(email)}, ${db.escape(password)}, ${db.escape(fullname)}, ${db.escape(gender)}, ${db.escape(address)}, ${db.escape(age)}, ${db.escape(role)}, ${db.escape(profile_picture)}, ${db.escape(verify)});`

        db.query(addQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    }
}