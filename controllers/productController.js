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
            let maxPage = Math.ceil(jumlahSemuaProduk / 10)
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
                let maxPageBoth = Math.ceil(jumlahSemuaProdukBoth / 10)
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
                let maxPageNone = Math.ceil(jumlahSemuaProdukNone / 10)
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
                let maxPageName = Math.ceil(jumlahSemuaProdukName / 10)
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
                let maxPageCategory = Math.ceil(jumlahSemuaProdukCategory / 10)
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
                let maxPageBoth = Math.ceil(jumlahSemuaProdukBoth / 10)
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
                let maxPageNone = Math.ceil(jumlahSemuaProdukNone / 10)
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
                let maxPageName = Math.ceil(jumlahSemuaProdukName / 10)
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
                let maxPageCategory = Math.ceil(jumlahSemuaProdukCategory / 10)
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
    },
    detailProduct: (req, res) => {
        let detailQuery = `select * from produk_satuan where idproduk = ${req.params.idproduct};`

        db.query(detailQuery, (err, resultDetailQuery) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(resultDetailQuery[0])
        })
    },
    getProductResep: (req, res) => {
        const { page } = req.body
        let getProductSatuan = 'select * from produk_resep;'

        db.query(getProductSatuan, (err, resultSemuaProduk) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            let jumlahSemuaProduk = resultSemuaProduk.length
            let maxPage = Math.ceil(jumlahSemuaProduk / 10)
            let offset = (page * 10) - 10

            let getQuery = `select * from produk_resep limit 10 offset ${offset};`

            db.query(getQuery, (err, resultPagination) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultPagination, maxPage])
            })
        })
    },
    filterProductResep: (req, res) => {
        const { name, category, page } = req.body

        if (name && category) {
            console.log(`filterByBoth`)
            let filterByBoth = `select * from produk_resep where nama like '%${name}%' and kategori = '${category}';`

            db.query(filterByBoth, (err, resultFilterByBoth) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukBoth = resultFilterByBoth.length
                let maxPageBoth = Math.ceil(jumlahSemuaProdukBoth / 10)
                let offsetBoth = (page * 10) - 10

                let paginationBoth = `select * from produk_resep where nama like '%${name}%' and kategori = '${category}' limit 10 offset ${offsetBoth};`

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
            let filterByNone = `select * from produk_resep;`

            db.query(filterByNone, (err, resultFilterByNone) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukNone = resultFilterByNone.length
                let maxPageNone = Math.ceil(jumlahSemuaProdukNone / 10)
                let offsetNone = (page * 10) - 10

                let paginationNone = `select * from produk_resep limit 10 offset ${offsetNone};`

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
            let filterByName = `select * from produk_resep where nama like '%${name}%';`

            db.query(filterByName, (err, resultFilterByName) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukName = resultFilterByName.length
                let maxPageName = Math.ceil(jumlahSemuaProdukName / 10)
                let offsetName = (page * 10) - 10

                let paginationName = `select * from produk_resep where nama like '%${name}%' limit 10 offset ${offsetName};`

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
            let filterByCategory = `select * from produk_resep where kategori = '${category}';`

            db.query(filterByCategory, (err, resultFilterByCategory) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukCategory = resultFilterByCategory.length
                let maxPageCategory = Math.ceil(jumlahSemuaProdukCategory / 10)
                let offsetCategory = (page * 10) - 10

                let paginationCategory = `select * from produk_resep where kategori = '${category}' limit 10 offset ${offsetCategory};`

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
    sortProductResep: (req, res) => {
        const { name, category, page, order, sort } = req.body

        if (name && category) {
            console.log(`filterByBoth`)
            let filterByBoth = `select * from produk_resep where nama like '%${name}%' and kategori = '${category}';`

            db.query(filterByBoth, (err, resultFilterByBoth) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukBoth = resultFilterByBoth.length
                let maxPageBoth = Math.ceil(jumlahSemuaProdukBoth / 10)
                let offsetBoth = (page * 10) - 10

                let paginationBoth = `select * from produk_resep where nama like '%${name}%' and kategori = '${category}' order by ${order} ${sort} limit 10 offset ${offsetBoth};`

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
            let filterByNone = `select * from produk_resep;`

            db.query(filterByNone, (err, resultFilterByNone) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukNone = resultFilterByNone.length
                let maxPageNone = Math.ceil(jumlahSemuaProdukNone / 10)
                let offsetNone = (page * 10) - 10

                let paginationNone = `select * from produk_resep order by ${order} ${sort} limit 10 offset ${offsetNone};`

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
            let filterByName = `select * from produk_resep where nama like '%${name}%';`

            db.query(filterByName, (err, resultFilterByName) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukName = resultFilterByName.length
                let maxPageName = Math.ceil(jumlahSemuaProdukName / 10)
                let offsetName = (page * 10) - 10

                let paginationName = `select * from produk_resep where nama like '%${name}%' order by ${order} ${sort} limit 10 offset ${offsetName};`

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
            let filterByCategory = `select * from produk_resep where kategori = '${category}';`

            db.query(filterByCategory, (err, resultFilterByCategory) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                let jumlahSemuaProdukCategory = resultFilterByCategory.length
                let maxPageCategory = Math.ceil(jumlahSemuaProdukCategory / 10)
                let offsetCategory = (page * 10) - 10

                let paginationCategory = `select * from produk_resep where kategori = '${category}' order by ${order} ${sort} limit 10 offset ${offsetCategory};`

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
    addProduct1foto: (req, res) => {
        // const id = +req.params.id
        console.log('req.file')

        if (!req.file) {
            res.status(400).send('NO FILE')
        }

        const uploadPict = `insert produk_satuan set link_foto = 'images/produk_satuan/${req.file.filename}'`
        db.query(uploadPict, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ foto: req.file.filename })
            console.log(req.file.filename)
            // const { nama, harga, stok, satuan, kategori, deskripsi, indikasi_umum, komposisi, dosis, aturan_pakai, kontra_indikasi, perhatian, efek_samping, segmentasi, kemasan, manufaktur, no_registrasi } = req.body
            // let addProduct1an = `insert into produk_satuan (nama, harga, stok, satuan, kategori, deskripsi, indikasi_umum, komposisi, dosis, aturan_pakai, kontra_indikasi, perhatian, efek_samping, segmentasi, kemasan, manufaktur, no_registrasi)
            // values (${db.escape(nama)}, ${db.escape(harga)}, ${db.escape(stok)}, ${db.escape(satuan)}, ${db.escape(kategori)}, ${db.escape(deskripsi)}, ${db.escape(indikasi_umum)}, ${db.escape(komposisi)}, ${db.escape(dosis)}, ${db.escape(aturan_pakai)}, ${db.escape(kontra_indikasi)}, ${db.escape(perhatian)}, ${db.escape(efek_samping)}, ${db.escape(segmentasi)}, ${db.escape(kemasan)}, ${db.escape(manufaktur)}, ${db.escape(no_registrasi)})`
            // db.query(addProduct1an, req.body, (err1, result1) => {
            //     if (err) {
            //         console.log(err1.response.data)
            //         res.status(400).send(err1.response.data)
            //     }
            //     console.log(result1)
            //     res.status(200).send("berhasil add product")
            // })
            // // console.log(db.id)
            // // let newProductID = db[db.length - 1].id + 1
            // //manipulasi objek dengan bkin property id
            // // req.body.id = newProductID
            // // let addQuery = `insert ignore into products (name, price, quantity) values (${db.escape(name)},${price},${quantity});`
            // // let addQuery = `insert ignore into products ?;`
            // let addQuery = `insert ignore into produk_satuan ?;`
            // db.query(addQuery, req.body, (err, result) => {
            //     res.status(200).send({ status: "Add Products Success", data: req.body })
            //     const getAllProducts = `select * from products;`
            //     db.query(getAllProducts, (err2, result2) => {
            //         if (err) {
            //             console.log(err2)
            //             res.status(400).send(err2)
            //         }
            //         res.status(200).send({ status: "Add Products Success", data: req.body })
            //     })
            // })
        })
    },
    addProduct1data: (req, res) => {
        console.log(req.body, req.body.hasil.foto)
        const { nama, harga, stok, satuan, kategori, deskripsi, indikasi_umum, komposisi, dosis, aturan_pakai, kontra_indikasi, perhatian, efek_samping, segmentasi, kemasan, manufaktur, no_registrasi } = req.body
        let addProduct1an = `update produk_satuan set nama=${db.escape(nama)}, harga=${db.escape(harga)}, stok=${db.escape(stok)}, satuan=${db.escape(satuan)}, kategori=${db.escape(kategori)}, 
            deskripsi=${db.escape(deskripsi)}, indikasi_umum=${db.escape(indikasi_umum)}, komposisi=${db.escape(komposisi)}, dosis=${db.escape(dosis)}, aturan_pakai=${db.escape(aturan_pakai)}, kontra_indikasi=${db.escape(kontra_indikasi)},
            perhatian=${db.escape(perhatian)}, efek_samping=${db.escape(efek_samping)}, segmentasi=${db.escape(segmentasi)}, kemasan=${db.escape(kemasan)}, manufaktur=${db.escape(manufaktur)}, no_registrasi=${db.escape(no_registrasi)}
            where link_foto = 'images/produk_satuan/${req.body.hasil.foto}'`

        let getidproduk = `select idproduk from produk_satuan where link_foto = 'images/produk_satuan/${req.body.hasil.foto}'`
        db.query(addProduct1an, req.body, (err1, result1) => {
            if (err1) {
                // console.log(err1.response.data)
                // console.log(req.file.filename)
                res.status(400).send(err1.response.data)
            }
            console.log(result1)
            // res.status(200).send({data:result1})
            db.query(getidproduk, req.body, (err2, result2) => {
                if (err2) {
                    // console.log(err1.response.data)
                    // console.log(req.file.filename)
                    res.status(400).send(err2.response.data)
                }
                res.status(200).send({ data: result2 })
            })
        })

    },
    addProductRfoto: (req, res) => {
        // const id = +req.params.id
        console.log('req.file')

        if (!req.file) {
            res.status(400).send('NO FILE')
        }

        const uploadPict = `insert produk_resep set link_foto = 'images/produk_resep/${req.file.filename}'`
        db.query(uploadPict, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ foto: req.file.filename })
            console.log(req.file.filename)
        })
    }

    , addProductRdata: (req, res) => {
        const { nama, harga, kategori, stokbotol, stokml } = req.body
        let addProductR = `update produk_resep set nama=${db.escape(nama)}, harga=${db.escape(harga)}, kategori=${db.escape(kategori)}, 
            stok_botol=${db.escape(stokbotol)}, stok_ml=${db.escape(stokml)}
            where link_foto = 'images/produk_resep/${req.body.hasil.foto}'`
        let getidprodukr = `select idproduk_resep from produk_resep where link_foto = 'images/produk_resep/${req.body.hasil.foto}'`
        db.query(addProductR, req.body, (err1, result1) => {
            if (err1) {
                // console.log(err1.response.data)
                // console.log(req.file.filename)
                res.status(400).send(err1.response.data)
            }
            console.log(result1)
            // res.status(200).send({data:result1})
            db.query(getidprodukr, req.body, (err2, result2) => {
                if (err2) {
                    // console.log(err1.response.data)
                    // console.log(req.file.filename)
                    res.status(400).send(err2.response.data)
                }
                res.status(200).send({ data: result2 })
            })
        })
    },
    delProduct1: (req, res) => {
        // const {delProduct} = req.body
        let delP1 = `delete from produk_satuan where idproduk = ${req.params.idproduct}`
        db.query(delP1, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send("Produk berhasil di delete")
            console.log(result)
        })
    },
    delProductR: (req, res) => {
        // const {delProduct} = req.body
        console.log(req.params.idproduct)
        let delPR = `delete from produk_resep where idproduk_resep = ${req.params.idproduct}`
        db.query(delPR, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send("Produk berhasil di delete")
            console.log(result)
        })
    },
    editProduct1foto: (req, res) => {
        console.log(req.file)
        console.log(req.params)
        const { idproduct } = req.body
        if (!req.file) {
            res.status(400).send('NO FILE')
        }

        const uploadPict = `update produk_satuan set link_foto='images/produk_satuan/${req.file.filename}' where idproduk =${req.params.idproduct}`
        db.query(uploadPict, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ foto: req.file.filename })
            console.log(req.file.filename)
        })
    },
    editProduct1data: (req, res) => {
        console.log(req.body)
        //data aja
        const { nama, harga, stok, satuan, kategori, deskripsi, indikasi_umum, komposisi, dosis, aturan_pakai, kontra_indikasi, perhatian, efek_samping, segmentasi, kemasan, manufaktur, no_registrasi, idproduct } = req.body
        let addProduct1an = `update produk_satuan set nama=${db.escape(nama)}, harga=${db.escape(harga)}, stok=${db.escape(stok)}, satuan=${db.escape(satuan)}, kategori=${db.escape(kategori)}, 
                deskripsi=${db.escape(deskripsi)}, indikasi_umum=${db.escape(indikasi_umum)}, komposisi=${db.escape(komposisi)}, dosis=${db.escape(dosis)}, aturan_pakai=${db.escape(aturan_pakai)}, kontra_indikasi=${db.escape(kontra_indikasi)},
                perhatian=${db.escape(perhatian)}, efek_samping=${db.escape(efek_samping)}, segmentasi=${db.escape(segmentasi)}, kemasan=${db.escape(kemasan)}, manufaktur=${db.escape(manufaktur)}, no_registrasi=${db.escape(no_registrasi)}
                where idproduk = ${db.escape(idproduct)}`
        // let getidproduk = `select idproduk from produk_satuan where link_foto = 'images/produk_satuan/${req.body.hasil.foto}'`
        db.query(addProduct1an, req.body, (err1, result1) => {
            if (err1) {
                // console.log(err1.response.data)
                // console.log(req.file.filename)
                res.status(400).send(err1)
            }
            console.log(result1)
            // res.status(200).send({data:result1})
            // db.query(getidproduk, req.body, (err2, result2) => {
            //     if (err2) {
            //         // console.log(err1.response.data)
            //         // console.log(req.file.filename)
            //         res.status(400).send(err2.response.data)
            //     }
            //     res.status(200).send({ data: result2 })
            // })
            // res.status(200).send({ data: result2 })
            res.status(200).send('Berhasil update produk')
        })
    },
    editProductRfoto: (req, res) => {
        console.log(req.file)
        console.log(req.params)
        const { idproduct } = req.body
        if (!req.file) {
            res.status(400).send('NO FILE')
        }

        const uploadPict = `update produk_resep set link_foto='images/produk_resep/${req.file.filename}' where idproduk_resep =${req.params.idproduct}`
        db.query(uploadPict, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ foto: req.file.filename })
            console.log(req.file.filename)
        })
    },
    editProductRdata: (req, res) => {
        console.log(req.body)
        //data aja
        const { nama, harga, stok, satuan, kategori, deskripsi, indikasi_umum, komposisi, dosis, aturan_pakai, kontra_indikasi, perhatian, efek_samping, segmentasi, kemasan, manufaktur, no_registrasi, idproduct } = req.body
        let addProductR = `update produk_resep set nama=${db.escape(nama)}, harga=${db.escape(harga)}, stok=${db.escape(stok)}, satuan=${db.escape(satuan)}, kategori=${db.escape(kategori)}, 
                deskripsi=${db.escape(deskripsi)}, indikasi_umum=${db.escape(indikasi_umum)}, komposisi=${db.escape(komposisi)}, dosis=${db.escape(dosis)}, aturan_pakai=${db.escape(aturan_pakai)}, kontra_indikasi=${db.escape(kontra_indikasi)},
                perhatian=${db.escape(perhatian)}, efek_samping=${db.escape(efek_samping)}, segmentasi=${db.escape(segmentasi)}, kemasan=${db.escape(kemasan)}, manufaktur=${db.escape(manufaktur)}, no_registrasi=${db.escape(no_registrasi)}
                where idproduk_resep = ${db.escape(idproduct)}`
        // let getidproduk = `select idproduk from produk_satuan where link_foto = 'images/produk_satuan/${req.body.hasil.foto}'`
        db.query(addProductR, req.body, (err1, result1) => {
            if (err1) {
                // console.log(err1.response.data)
                // console.log(req.file.filename)
                res.status(400).send(err1)
            }
            console.log(result1)
            // res.status(200).send({data:result1})
            // db.query(getidproduk, req.body, (err2, result2) => {
            //     if (err2) {
            //         // console.log(err1.response.data)
            //         // console.log(req.file.filename)
            //         res.status(400).send(err2.response.data)
            //     }
            //     res.status(200).send({ data: result2 })
            // })
            // res.status(200).send({ data: result2 })
            res.status(200).send('Berhasil update produk resep')
        })
    },
    detailProductresep: (req, res) => {
        let detailQuery = `select * from produk_resep where idproduk_resep = ${req.params.idproduct};`

        db.query(detailQuery, (err, resultDetailQuery) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(resultDetailQuery[0])
        })
    }
}