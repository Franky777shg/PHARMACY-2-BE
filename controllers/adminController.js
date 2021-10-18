const { db } = require('../database')

module.exports = {
    getTransaksiResep: (req, res) => {
        const { page } = req.body
        let getOrderResep = 'select * from order_resep;'

        db.query(getOrderResep, (err, resultSemuaOrder) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaOrder = resultSemuaOrder.length
            // console.log(jumlahSemuaOrder) //25
            let maxPage = Math.ceil(jumlahSemuaOrder / 5)
            // console.log(maxPage) //5
            let offset = (page * 5) - 5 //1-5 halaman
            // console.log(offset) //0

            let getQuery = `select * from order_resep limit 5 offset ${offset};`

            db.query(getQuery, (err, resultPagination) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPagination, maxPage])
            })
        })
    },
    getTransaksiSatuan: (req, res) => {
        const { page } = req.body
        let getOrderResep = 'select * from order_satuan;'

        db.query(getOrderResep, (err, resultSemuaOrderSatuan) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaOrder = resultSemuaOrderSatuan.length
            let maxPage = Math.ceil(jumlahSemuaOrder / 5)
            let offset = (page * 5) - 5 //1-5 halaman

            let getQuery = `select * from order_satuan limit 5 offset ${offset};`

            db.query(getQuery, (err, resultPaginationSatuan) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPaginationSatuan, maxPage])
            })
        })
    },
    
}
