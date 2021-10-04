const { db } = require('../database')

module.exports = {
    getProduct: (req, res) => {
        const { page } = req.body
        let getProductSatuan = 'select * from produk_satuan;'

        db.query(getProductSatuan, (err, resultSemuaProduk) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaProduk = resultSemuaProduk.length
            let maxPage = Math.ceil(jumlahSemuaProduk/10)
            let offset = (page * 10) - 10

            let getQuery = `select * from produk_satuan limit 10 offset ${offset}`

            db.query(getQuery, (err, resultPagination) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPagination, maxPage])
            })

        })
    }
}