const { db } = require('../database')

module.exports = {
    getTransaksiResep: (req, res) => {
        const { page } = req.body
        // let getOrderResep = 'select * from order_resep;'
        let getOrderResep = `select * from user u
        join order_resep r
        on u.iduser = r.iduser`

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

            let getQuery = `select * from user u
            join order_resep r
            on u.iduser = r.iduser limit 5 offset ${offset};`

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
        // let getOrderSatuan = 'select * from order_satuan;'
        let getOrderSatuan = `select * from user u
        join order_satuan s
        on u.iduser = s.iduser;`

        db.query(getOrderSatuan, (err, resultSemuaOrderSatuan) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaOrder = resultSemuaOrderSatuan.length
            let maxPage = Math.ceil(jumlahSemuaOrder / 5)
            let offset = (page * 5) - 5 //1-5 halaman

            let getQuery = `select * from user u
            join order_satuan s
            on u.iduser = s.iduser limit 5 offset ${offset};`

            db.query(getQuery, (err, resultPaginationSatuan) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPaginationSatuan, maxPage])
            })
        })
    },
    filterTransByResep: (req, res) => {
        const { name, page} = req.body
        // console.log(`filterByName`)
        let filterByName = `select * from user u
            join order_resep r
            on u.iduser = r.iduser
            where username like '%${name}%' or date like '%${name}%' or order_number like '%${name}%';`

        db.query(filterByName, (err, resultFilterByName) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaProdukBoth = resultFilterByName.length
            let maxPageName = Math.ceil(jumlahSemuaProdukBoth / 5)
            let offsetName = (page * 5) - 5

            let paginationName = `select * from user u
                join order_resep r
                on u.iduser = r.iduser
                where username like '%${name}%' or date like '%${name}%' or order_number like '%${name}%' limit 5 offset ${offsetName};`

            db.query(paginationName, (err, resultPaginationName) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPaginationName, maxPageName])
            })
        })

    },
    filterTransBySatuan: (req, res) => {
        const { name, page } = req.body
        // console.log(`filterByName`)
        let filterBysatuan = `select * from user u
            join order_satuan s
            on u.iduser = s.iduser
            where username like '%${name}%' or date like '%${name}%' or order_number like '%${name}%';`

        db.query(filterBysatuan, (err, resultFilterBySatuan) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaFilter = resultFilterBySatuan.length
            let maxPageSatuan = Math.ceil(jumlahSemuaFilter / 5)
            let offsetSatuan = (page * 5) - 5

            let paginationSatuan = `select * from user u
                join order_satuan s
                on u.iduser = s.iduser
                where username like '%${name}%' or date like '%${name}%' or order_number like '%${name}%' limit 5 offset ${offsetSatuan};`

            db.query(paginationSatuan, (err, resultPaginationSatuan) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPaginationSatuan, maxPageSatuan])
            })
        })

    },

}
