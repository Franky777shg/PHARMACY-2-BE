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
    
    getResepById: (req, res) => { //fokus sini
        let getQuery = `select * from order_resep where order_number = ${db.escape(req.body.order_number)}`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },

    addDataResep: (req, res) => { //ok
        let getQuery = `insert into order_resep set ?;`

        db.query(getQuery, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            
                res.status(200).send(req.body)
        })
    },

    getById: (req, res) => {
        const id = req.params.id
        let getQuery = `select * from order_resep where idresep = ${id}`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },

   
    uploadResepPic: (req, res) => {
        const id = req.params.id
        
        console.log('req.file', req.file)

        if (!req.file) {
            res.status(400).send('NO FILE')
        }
        // const updatePicture = `update order_resep set image_resep = 'images/photoResep/${req.file.filename}' where idresep = ${id} order by idusers = ${db.escape(req.body.idusers)} and order_number = ${db.escape(req.body.order_number)};`
        const updatePicture = `update order_resep set image_resep = 'images/photoResep/${req.file.filename}' where idresep = ${id} ;`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(`images/photoResep/${req.file.filename}`)
        })
    },

}