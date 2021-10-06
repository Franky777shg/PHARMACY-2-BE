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

            let getQuery = `select * from produk_satuan limit 10 offset ${offset};`

            db.query(getQuery, (err, resultPagination) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPagination, maxPage])
            })
        })
    }, 
    filterProduct: (req, res) => {
        const { name, category, page } = req.body

        if (name && category) {
            console.log(`filterByBoth`)
            let filterByBoth = `select * from produk_satuan where nama like '%${name}%' and kategori = '${category}';`

            db.query(filterByBoth, (err, resultFilterByBoth) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukBoth = resultFilterByBoth.length
                let maxPageBoth = Math.ceil(jumlahSemuaProdukBoth/10)
                let offsetBoth = (page * 10) - 10

                let paginationBoth = `select * from produk_satuan where nama like '%${name}%' and kategori = '${category}' limit 10 offset ${offsetBoth};`

                db.query(paginationBoth, (err, resultPaginationBoth) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
    
                    res.status(200).send([...resultPaginationBoth, maxPageBoth])
                })
            })
        } else if (!name && !category) {
            console.log(`filterByNone`)
            let filterByNone = `select * from produk_satuan;`

            db.query(filterByNone, (err, resultFilterByNone) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukNone = resultFilterByNone.length
                let maxPageNone = Math.ceil(jumlahSemuaProdukNone/10)
                let offsetNone = (page * 10) - 10

                let paginationNone = `select * from produk_satuan limit 10 offset ${offsetNone};`

                db.query(paginationNone, (err, resultPaginationNone) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }

                    res.status(200).send([...resultPaginationNone, maxPageNone])
                })
            })
        } else if (!category) {
            console.log(`filterByName`)
            let filterByName = `select * from produk_satuan where nama like '%${name}%';`

            db.query(filterByName, (err, resultFilterByName) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukName = resultFilterByName.length
                let maxPageName = Math.ceil(jumlahSemuaProdukName/10)
                let offsetName = (page * 10) - 10

                let paginationName = `select * from produk_satuan where nama like '%${name}%' limit 10 offset ${offsetName};`

                db.query(paginationName, (err, resultPaginationName) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
    
                    res.status(200).send([...resultPaginationName, maxPageName])
                })
            })
        } else {
            console.log(`filterByCategory`)
            let filterByCategory = `select * from produk_satuan where kategori = '${category}';`

            db.query(filterByCategory, (err, resultFilterByCategory) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukCategory = resultFilterByCategory.length
                let maxPageCategory = Math.ceil(jumlahSemuaProdukCategory/10)
                let offsetCategory = (page * 10) - 10

                let paginationCategory = `select * from produk_satuan where kategori = '${category}' limit 10 offset ${offsetCategory};`

                db.query(paginationCategory, (err, resultPaginationCategory) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
    
                    res.status(200).send([...resultPaginationCategory, maxPageCategory])
                })
            })
        }
    },
    sortProduct: (req, res) => {
        const { name, category, page, order, sort } = req.body

        if (name && category) {
            console.log(`filterByBoth`)
            let filterByBoth = `select * from produk_satuan where nama like '%${name}%' and kategori = '${category}';`

            db.query(filterByBoth, (err, resultFilterByBoth) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukBoth = resultFilterByBoth.length
                let maxPageBoth = Math.ceil(jumlahSemuaProdukBoth/10)
                let offsetBoth = (page * 10) - 10

                let paginationBoth = `select * from produk_satuan where nama like '%${name}%' and kategori = '${category}' order by ${order} ${sort} limit 10 offset ${offsetBoth};`

                db.query(paginationBoth, (err, resultPaginationBoth) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
    
                    res.status(200).send([...resultPaginationBoth, maxPageBoth])
                })
            })
        } else if (!name && !category) {
            console.log(`filterByNone`)
            let filterByNone = `select * from produk_satuan;`

            db.query(filterByNone, (err, resultFilterByNone) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukNone = resultFilterByNone.length
                let maxPageNone = Math.ceil(jumlahSemuaProdukNone/10)
                let offsetNone = (page * 10) - 10

                let paginationNone = `select * from produk_satuan order by ${order} ${sort} limit 10 offset ${offsetNone};`

                db.query(paginationNone, (err, resultPaginationNone) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }

                    res.status(200).send([...resultPaginationNone, maxPageNone])
                })
            })
        } else if (!category) {
            console.log(`filterByName`)
            let filterByName = `select * from produk_satuan where nama like '%${name}%';`

            db.query(filterByName, (err, resultFilterByName) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukName = resultFilterByName.length
                let maxPageName = Math.ceil(jumlahSemuaProdukName/10)
                let offsetName = (page * 10) - 10

                let paginationName = `select * from produk_satuan where nama like '%${name}%' order by ${order} ${sort} limit 10 offset ${offsetName};`

                db.query(paginationName, (err, resultPaginationName) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
    
                    res.status(200).send([...resultPaginationName, maxPageName])
                })
            })
        } else {
            console.log(`filterByCategory`)
            let filterByCategory = `select * from produk_satuan where kategori = '${category}';`

            db.query(filterByCategory, (err, resultFilterByCategory) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukCategory = resultFilterByCategory.length
                let maxPageCategory = Math.ceil(jumlahSemuaProdukCategory/10)
                let offsetCategory = (page * 10) - 10

                let paginationCategory = `select * from produk_satuan where kategori = '${category}' order by ${order} ${sort} limit 10 offset ${offsetCategory};`

                db.query(paginationCategory, (err, resultPaginationCategory) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
    
                    res.status(200).send([...resultPaginationCategory, maxPageCategory])
                })
            })
        }
    }
}