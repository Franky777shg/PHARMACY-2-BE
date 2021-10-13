const { db } = require('../database')
const { createToken } = require('../helpers/jwt')

module.exports = {
    uploadPhoto: (req, res) => {
        const iduser = req.user.iduser
        console.log('req.file', req.file)

        if (!req.file) {
            res.status(400).send('NO FILE')
        }

        const updatePicture = `update user set profile_picture = 'images/photoProfile/${req.file.filename}' where iduser = ${iduser};`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    deletePhoto: (req, res) => {
        const iduser = req.user.iduser
        const updatePicture = `update user set profile_picture = '' where iduser = ${iduser};`

        db.query(updatePicture, (err, resultdel) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(resultdel)
        })
    },
    getResepById: (req, res) => {
        let id = req.params.id
        let getQuery = `select * from order_resep where idresep = ${id}`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },
    getResep: (req, res) => {
        let getQuery = `select * from order_resep;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },
    uploadResep: (req, res) => {
        const id = req.params.id
        // const {idusers} = req.body
        // console.log(idusers)
        console.log('req.file', req.file)

        if (!req.file) {
            res.status(400).send('NO FILE')
        }
        // const updatePicture = `update order_resep set image_resep = 'images/photoResep/${req.file.filename}' where idresep = ${id} order by idusers = ${db.escape(req.body.idusers)} and order_number = ${db.escape(req.body.order_number)};`
        const updatePicture = `update order_resep set image_resep = 'images/photoResep/${req.file.filename}' where idresep = ${id} order by date = ${db.escape(req.body.date)};`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            // let token = createToken({
            //     idresep: result.insertId
            // })
            // console.log(token)

            res.status(200).send(result)
        })
    },
    updateResep: (req, res) => {
        const idresep = req.params.id
        const updateResep = `update order_resep set ? where idresep = ${idresep}`

        db.query(updateResep, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            let getAllUsers = `select * from order_resep where idresep = ${idresep}`

            db.query(getAllUsers, (err2, result2) => {
                if (err) {
                    console.log(err2)
                    res.status(400).send(err2)
                }
                res.status(200).send(result2)
            })
        })
    },
    addDataResep: (req, res) => {
        let getQuery = `insert into order_resep set ?;`

        db.query(getQuery, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },

}