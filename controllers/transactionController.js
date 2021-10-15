const { db } = require('../database')
const { createToken } = require('../helpers/jwt')

module.exports = {
    getCartUser: (req,res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.status='cart';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({cart: result[0]})
            // res.status(200).send({cart: result[0]})
            console.log(result)
        })
    },
    addCart: (req, res) => {
        console.log(req.body)
        // const {order_number,product_image,qty_beli,harga} = req.body
        //order number dan id produk -> update qty
        const {order_number,idproduk,nama,product_image,qty_beli,harga} = req.body.cart
        let addCart = `insert into order_detail_satuan set order_number =${order_number}, idproduk = ${req.params.idproduct}, nama=${nama}, product_image=${product_image}, qty_beli=${qty_beli}, harga=${harga}, totalharga=${qty_beli}*${harga}`
        let updateCart = `update order_detail set order_number=${order.number}, iduser=${iduser}, status='cart`
        let addOrder = `insert into order_detail (order_number, iduser, status) values (${order.number}, ${iduser}, 'cart');`
        db.query(updateCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send("Produk berhasil di push dengan data terbaru")
            console.log(result)
        })

    },
    addNewCart: (req, res) => {
        console.log(req.body)
        // const {order_number,product_image,qty_beli,harga} = req.body
        const {idproduk,nama,stok,harga,link_foto} = req.body.cart[0].produkdibeli
       const {qty} =req.body.cart[0]
       
        // let today = new Date().toLocaleDateString()
        let order_number = 'INV'+'/'+ new Date().toLocaleDateString()+'/'+ idproduk+req.params.iduser+1
        let total_harga = req.body.cart[0].produkdibeli.harga * req.body.cart[0].qty
        console.log(order_number)
        let addCart = `insert into order_detail_satuan (order_number, idproduk, nama, product_image, qty_beli, harga, total_harga) values (${db.escape(order_number)}, ${db.escape(idproduk)}, ${db.escape(nama)}, ${db.escape(link_foto)}, ${db.escape(qty)}, ${db.escape(harga)}, ${db.escape(total_harga)})`
        // let updateOrder = `update order_detail set order_number=${order.number}, iduser=${iduser}, status='cart`
        let addOrdersatuan = `insert into order_satuan (order_number, iduser, status) values (${db.escape(order_number)}, ${req.params.iduser}, 'cart');`
        db.query(addCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            
            console.log(result)
            db.query(addOrdersatuan, (err1,result1) => {
                if (err1){
                    console.log(err1)
                    res.status(400).send(err1)
                }
                console.log(result1)
                res.status(200).send("Produk berhasil dimasukkan ke cart")
            })
        })

    }
}