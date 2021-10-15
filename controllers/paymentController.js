const { db } = require('../database')

module.exports = {
    addDataPayment: (req, res) => {
        let getQuery = `insert into payment_resep set ?;`

        db.query(getQuery, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(req.body)

        })
    },

    uploadPaymentResep: (req, res) => {
        const id = req.params.id
        console.log('req.file', req.file)

        if (!req.file) {
            res.status(400).send('NO FILE')
        }
        // const updatePicture = `update order_resep set image_resep = 'images/photoResep/${req.file.filename}' where idresep = ${id} order by idusers = ${db.escape(req.body.idusers)} and order_number = ${db.escape(req.body.order_number)};`
        const updatePicture = `update payment_resep set payment_proof_resep = 'images/paymentResep/${req.file.filename}' where id_payment_resep = ${id};`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(`images/paymentResep/${req.file.filename}`)
        })
    },
    getPaymentById: (req, res) => {
        const getPayQuery = `select * from payment_resep where order_number = ${req.body.order_number}`

        db.query(getPayQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
            console.log(result)
        })
    },

    getPaymentById2: (req, res) => {
        const getPayQuery = `select * from payment_resep where id_payment_resep = ${req.params.id}`

        db.query(getPayQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
            console.log(result)
        })
    },
    getAllPaymentResep: (req, res) => {
        let getQuery = `select * from payment_resep;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
        })
    },

}






// select * from payment_resep p
// join order_resep r
// on p.order_number = r.order_number
// where iduser = 3 and idresep = 1;