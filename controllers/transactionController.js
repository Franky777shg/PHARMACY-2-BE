const { db } = require('../database')

const { createToken } = require('../helpers/jwt')

module.exports = {
    getCartUser: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.status='cart';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ cart: result })
            // res.status(200).send({cart: result[0]})
            console.log(result)
        })
    },
    addCart: (req, res) => {
        console.log(req.body)
        let index = req.body.cart.length - 1
        // const {order_number,product_image,qty_beli,harga} = req.body
        //order number dan id produk -> update qty
        const { order_number } = req.body.cart[0]
        const { idproduk, nama, stok, harga, link_foto } = req.body.cart[index].produkdibeli
        const { qty } = req.body.cart[index].qty
        let total_harga = req.body.cart[index].produkdibeli.harga * req.body.cart[index].qty
        let addCart = `insert into order_detail_satuan set order_number =${db.escape(order_number)}, idproduk = ${db.escape(idproduk)}, nama=${db.escape(nama)}, product_image=${db.escape(link_foto)}, qty_beli=${db.escape(req.body.cart[index].qty)}, harga=${db.escape(harga)}, total_harga=${db.escape(total_harga)}`
        // let updateCart = `update order_detail set order_number=${db.escape(order.number)}, iduser=${iduser}, status='cart`
        // let addOrder = `insert into order_detail (order_number, iduser, status) values (${order.number}, ${iduser}, 'cart');`
        db.query(addCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(`Produk berhasil di push dengan data terbaru pada order:${order_number}`)
            console.log(result)
        })
    }, addqtyCart: (req, res) => {
        console.log(req.body)
        // console.log(req.body.cart)
        // console.log(req.body.cart[req.body.cart.length-1].index)
        //order number dan id produk -> update qty
        const { index } = req.body.cart[req.body.cart.length - 1]
        // const {     qty_beli, harga } = req.body.cart[indek]
        let total_harga = req.body.cart[index].harga * req.body.cart[index].qty_beli
        let editqty = `update order_detail_satuan set qty_beli=${db.escape(req.body.cart[index].qty_beli)}, total_harga=${db.escape(total_harga)} where order_number =${db.escape(req.body.cart[index].order_number)} and idproduk = ${db.escape(req.body.cart[index].idproduk)} and nama=${db.escape(req.body.cart[index].nama)}`
        // let updateCart = `update order_detail set order_number=${order.number}, iduser=${iduser}, status='cart`
        // let addOrder = `insert into order_detail (order_number, iduser, status) values (${order.number}, ${iduser}, 'cart');`
        db.query(editqty, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send("Produk berhasil di push dengan data quantity terbaru")
            console.log(result)
        })
    },
    addNewCart: (req, res) => {
        console.log(req.body)
        // const {order_number,product_image,qty_beli,harga} = req.body
        const { idproduk, nama, stok, harga, link_foto } = req.body.cart[0].produkdibeli
        const { qty } = req.body.cart[0]

        // let today = new Date().toLocaleDateString()
        let order_number = 'INV' + '/' + new Date().toLocaleDateString() + '/' + idproduk + req.params.iduser + 1
        let date = new Date().toLocaleDateString()
        let total_harga = req.body.cart[0].produkdibeli.harga * req.body.cart[0].qty
        console.log(order_number)
        let addCart = `insert into order_detail_satuan (order_number, idproduk, nama, product_image, qty_beli, harga, total_harga) values (${db.escape(order_number)}, ${db.escape(idproduk)}, ${db.escape(nama)}, ${db.escape(link_foto)}, ${db.escape(qty)}, ${db.escape(harga)}, ${db.escape(total_harga)})`
        // let updateOrder = `update order_detail set order_number=${order.number}, iduser=${iduser}, status='cart`
        let addOrdersatuan = `insert into order_satuan (order_number, iduser, status, date) values (${db.escape(order_number)}, ${req.params.iduser}, 'cart', ${db.escape(date)});`
        db.query(addCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            db.query(addOrdersatuan, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                console.log(result1)
                res.status(200).send(`Produk berhasil dimasukkan ke cart, order:${order_number}`)
            })
        })
    },
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
        // const getQuery = 'SELECT * FROM order_resep where status = "Waiting For Approval" or status = "Waiting For Payment" or status = "Waiting For Payment Approval" or status = "Processing" or status = "Sending Package";'
        const getQuery = 'select * from user u join order_resep r on u.iduser = r.iduser where status = "Waiting For Approval" or status = "Waiting For Payment" or status = "Waiting For Payment Approval" or status = "Processing" or status = "Sending Package";'

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    getTransaksiObtResepComplete: (req, res) => {
        // const getQuery = 'SELECT * FROM order_resep where status = "Complete";'
        const getQuery = 'select * from user u join order_resep r on u.iduser = r.iduser where status = "Complete";'

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
            res.status(200).send(resultCariBahan.splice(0, 1))
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
    },
    getDetailOrderResep: (req, res) => {
        const { order_number } = req.body

        const getDetail = `select * from order_detail_resep where order_number = ${order_number};`

        db.query(getDetail, (err, resultDetailOrder) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultDetailOrder)
        })
    },
    getImageBuktiPembayaranResep: (req, res) => {
        const { order_number } = req.body

        const query = `select payment_proof_resep from payment_resep where order_number = ${order_number};`

        db.query(query, (err, resultImageBuktiPembayaranResep) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultImageBuktiPembayaranResep[0].payment_proof_resep)
        })
    },
    getDetailOrderSatuan: (req, res) => {
        const { order_number } = req.body

        const getDetail = `select * from order_detail_satuan where order_number = ${order_number};`

        db.query(getDetail, (err, resultDetailOrder) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(resultDetailOrder)
        })
    },
    deleterowCart: (req, res) => {
        const { order_number, iduser } = req.body
        console.log(req.body)
        const delRowCart = `DELETE FROM order_detail_satuan WHERE order_number = ${db.escape(order_number)} AND idproduk = ${req.params.idProdCart};`
        const checkorder = `select count(order_number) as checkorder from order_detail_satuan where order_number = ${db.escape(order_number)};`
        const delRowOrder = `DELETE FROM order_satuan WHERE order_number = ${db.escape(order_number)} AND iduser = ${db.escape(iduser)};`

        db.query(delRowCart, (err, resultCart) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            db.query(checkorder, (err, resultcheck) => {
                // console.log(resultcheck)
                // console.log(resultcheck[0])

                if (resultcheck[0].checkorder === 0) {
                    db.query(delRowOrder, (err, resultfinal) => {
                        if (err) {
                            console.log(err)
                            res.status(400).send(err)
                        }
                        res.status(200).send("Berhasil di delete dan cart kosong, silakan masukan produk ke cart")
                    })
                }
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }
                else { res.status(200).send("Item berhasil di delete") }
            })
        })
    },
    getCartQty: (req, res) => {
        // console.log(req.body)
        // console.log(req.params.iduser)
        // const {iduser} = req.body
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga, a.status
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND idproduk=${db.escape(req.body.idproduk)} AND b.order_number = ${db.escape(req.body.order_number)} AND a.status='cart';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            console.log(result)
            res.status(200).send(result)
            // res.status(200).send({cart: result[0]})
        })
    },
    saveqtyCart: (req, res) => {
        console.log(req.body)
        // console.log(req.body.cart)
        //order number dan id produk -> update qty
        let total_harga = req.body.harga * req.body.qty_save
        let saveqty = `update order_detail_satuan set qty_beli=${db.escape(req.body.qty_save)}, total_harga=${db.escape(total_harga)} where order_number =${db.escape(req.body.order_number)} and idproduk = ${db.escape(req.body.idproduk)} and nama=${db.escape(req.body.nama)}`
        // let updateCart = `update order_detail set order_number=${order.number}, iduser=${iduser}, status='cart`
        // let addOrder = `insert into order_detail (order_number, iduser, status) values (${order.number}, ${iduser}, 'cart');`
        db.query(saveqty, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send("Produk berhasil di save dengan data quantity terbaru")
            console.log(result)
        })
    },
    gettotalCartUser: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        let getCartTotal = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status, sum(b.total_harga) as total_bayar
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.status='cart';`
        db.query(getCartTotal, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ carttotal: result })
            // res.status(200).send({cart: result[0]})
            console.log(result)
        })
    },
    updateqtyProduk: (req,res) => {
        console.log(req.body)
        let updateQty = `update produk_satuan set stok=${db.escape(req.body.qty_update)} where idproduk=${db.escape(idproduk)}`
        db.query(updateQty, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ produkupdateqty: result })
            console.log(result)
        })
    }
}