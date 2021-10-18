const { db } = require('../database')

const { createToken } = require('../helpers/jwt')

module.exports = {
    OGWaitingforPayment: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='cart';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Waiting For Payment' where order_number=${result.data.order_number}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ ongoing: result1 })
                console.log(result1)
            })
        })
    },
    getHistoryComplete: (req, res) => {
        let posthistoryComplete = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Complete';`
        db.query(posthistoryComplete, (err, res) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ history: res })
        })
    },
    getOGWaitingForPaymentApproval: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Waiting For Payment';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Waiting For Payment Approval' where order_number=${result.data.order_number}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ ongoing: result1 })
                console.log(result1)
            })
        })
    },
    getOGProcessing: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Waiting For Payment Approval';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Processing' where order_number=${result.data.order_number}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ ongoing: result1 })
                console.log(result1)
            })
        })
    },
    getOGSendingP: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Processing';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Sending Package' where order_number=${result.data.order_number}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ ongoing: result1 })
                console.log(result1)
            })
        })
    },
    getOGHist: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Sending Package';`
        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Complete' where order_number=${result.data.order_number}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ history: result1 })
                console.log(result1)
            })
        })
    },
    getonGoing: (req, res) => {
        console.log(req.body)
        // console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getonGoing = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND (a.status='Waiting For Payment' OR a.status='Waiting For Payment Approval' OR a.status='Sending Package' OR a.status='Processing');`
        db.query(getonGoing, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({ongoing: result})
        })
    },
    getHistory: (req, res) => {
        console.log(req.body)
        // console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getHist = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Complete';`
        db.query(getHist, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send({history: result})
            })
    
    }
}