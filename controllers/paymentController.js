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

    totalHarga : (req, res) => {
        let totalHarga = `select SUM(qty_beli * harga) as Total_Harga from order_detail_resep where order_number = ${db.escape(req.body.order_number)};`
        db.query(totalHarga, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result[0])

        })
    },

    uploadPaymentResep: (req, res) => {
        console.log('req.file', req.file)

        if (!req.file) {
            res.status(400).send('NO FILE')
        }
        // const updatePicture = `update order_resep set image_resep = 'images/photoResep/${req.file.filename}' where idresep = ${id} order by idusers = ${db.escape(req.body.idusers)} and order_number = ${db.escape(req.body.order_number)};`
        const updatePicture = `update payment_resep set payment_proof_resep = 'images/paymentResep/${req.file.filename}' where id_payment_resep = ${req.params.id};`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(`images/paymentResep/${req.file.filename}`)
        })
    },
    getPaymentById: (req, res) => {
        const getPayQuery = `select * from payment_resep where order_number = ${db.escape(req.body.order_number)}`
        // const getPayQuery = `select * from payment_resep p
        // join order_resep r
        // on r.order_number = p.order_number
        // where p.order_number = ${db.escape(req.body.order_number)};`

        db.query(getPayQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
            console.log(result)
        })
    },
    updateStatus: (req, res) => {
        const updateStatus = `update order_resep set status = 'Waiting For Payment Approval' where order_number = ${db.escape(req.body.order_number)};`

        db.query(updateStatus, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send('Waiting For Payment Approval')
            console.log(result)
        })
    },

    prosesTransac: (req, res) => {
        const prosesTran = `update order_resep set status = 'Waiting For Payment Approval' where order_number = ${db.escape(req.body.order_number)};`

        db.query(prosesTran, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send('Waiting For Payment Approval')
            console.log(result)
        })
    },
    


}






// select * from payment_resep p
// join order_resep r
// on p.order_number = r.order_number
// where iduser = 3 and idresep = 1;