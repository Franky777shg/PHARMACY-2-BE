const { db } = require('../database')

module.exports = {
    login: (req,res) => {
    
        const {username, password} = req.body

        const getUser = `select * from user where (username = ${db.escape(username)} or email = ${db.escape(username)}) and password = ${db.escape(password)};`
        console.log(getUser)
        db.query(getUser, (err,result) => {
            if (err){
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