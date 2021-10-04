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
    }
}