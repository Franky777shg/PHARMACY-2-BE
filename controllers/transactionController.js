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

    }
}