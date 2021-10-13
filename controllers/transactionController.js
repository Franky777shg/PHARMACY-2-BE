const { db } = require('../database')

const { createToken } = require('../helpers/jwt')

module.exports = {
  pushCart: (req, res) => {
        // const {delProduct} = req.body
        let delP1 = `inesrt into from produk_satuan where idproduk = ${req.params.idproduct}`
        db.query(delP1, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
          res.status(200).send("Produk berhasil di push")
            console.log(result)
        })
    },
    getTransaksiObtResepOnGoing: (req, res) => {
        const getQuery = 'SELECT * FROM order_resep where status = "Waiting For Approval" or status = "Waiting For Payment" or status = "Waiting For Payment Approval" or status = "Processing" or status = "Sending Package";'
    
        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    getTransaksiObtResepComplete: (req, res) => {
        const getQuery = 'SELECT * FROM order_resep where status = "Complete";'
        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    getTransaksiObtResepCancel: (req, res) => {
        const getQuery = 'SELECT * FROM order_resep where status = "Cancel";'
        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    getDataOrder: (req, res) => {
        const { order_number } = req.body
        const getOrderQuery = `SELECT * FROM order_resep where order_number = ${order_number};`

        db.query(getOrderQuery, (err, resultOrder) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultOrder[0])
        })
    },
    cariBahan: (req, res) => {
        const { nama } = req.body

        const queryCariBahan = `select * from produk_resep where nama like '%${nama}%';`

        db.query(queryCariBahan, (err, resultCariBahan) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultCariBahan.splice(0,1))
        })
    },
    pilihBahanResep: (req, res) => {
        const { id } = req.body

        const queryById = `select * from produk_resep where idproduk_resep = ${id};`

        db.query(queryById, (err, resultById) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultById[0])
        })
    },
  addToOrderDetailResep: (req, res) => {
        let addQuery = `insert into order_detail_resep set ?`

        db.query(addQuery, req.body, (err, resultAddODetailResep) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultAddODetailResep)
        })
    },
  updateStokResep: (req, res) => {
        const { id, stok } = req.body

        let updateStokResep = `update produk_resep set stok_ml = ${stok} where idproduk_resep = ${id};`
        db.query(updateStokResep, (err, resultUpdateStokResep) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultUpdateStokResep)
        })
    },
    updateStatusResep: (req, res) => {
        const { statusBaru, order_number } = req.body

        let updateStatusResep = `update order_resep set status = "${statusBaru}" where order_number = ${order_number};`
        db.query(updateStatusResep, (err, resultUpdateStatusResep) => {
          if (err) {
                console.log(err)
                res.status(400).send(err)
            }
          res.status(200).send(resultUpdateStatusResep)
        })
    },
    rejectTransactionResep: (req, res) => {
        const { statusBaru, order_number } = req.body

        let rejectResep = `update order_resep set status = "${statusBaru}" where order_number = ${order_number};`

        db.query(rejectResep, (err, resultRejectResep) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultRejectResep)
        })
    }
}