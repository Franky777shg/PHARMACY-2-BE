const { db } = require('../database')

const { createToken } = require('../helpers/jwt')

module.exports = {
    OGWaitingforPayment: (req, res) => {
        console.log(req.body)
        // console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='cart';`
        let posthistory = `update order_satuan set status='Waiting For Payment' where order_number=${db.escape(req.body.order_number)}`

        db.query(getCart, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing

            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                console.log(result1)
                res.status(200).send({ ongoing: result1 })


            })
        })

    },
    getHistoryComplete: (req, res) => {
        let posthistoryComplete = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
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
    getOGProcessing: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
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
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
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
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
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

        let getonGoing = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser};`
 let total_bayar = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date, sum(b.total_harga) as total_bayar
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser};`
        db.query(getonGoing, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({hasilongoing: result})
            // console.log(result[0].total_bayar)
            res.status(200).send(result)
        })
    },
    getHistory: (req, res) => {
        console.log(req.body)
        // console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getHist = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Complete';`
        db.query(getHist, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({hasilhistory: result})
            res.status(200).send(result)
        })

    },
    postpmt: (req, res) => {
        console.log(req.body)
        let getCartTotal = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status, a.date, sum(b.total_harga) as total_bayar
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.status='Waiting for Payment';`

        
        // let postupdate = `update order_satuan set status='Waiting For Payment Approval' where order_number=${db.escape(req.body.order_number)} and iduser=${req.params.iduser}`

        db.query(getCartTotal, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            // res.status(200).send({cart: result[0]})
            console.log(result)
            let postpayment = `insert into payment_satuan (order_number, payment_proof_satuan,total_belanja,iduser) values (${db.escape(result[0].order_number)}, 'Loading',${db.escape(result[0].total_bayar)},${req.params.iduser})`
            db.query(postpayment, (err2, result2) => {
                console.log(result2)
                if (err2) {
                    console.log(err2)
                    res.status(400).send(err2)
                }
                // db.query(postupdate, (err1, result1) => {
                //     if (err1) {
                //         console.log(err1)
                //         res.status(400).send(err1)
                //     }
                    res.status(200).send({ ongoing: result2 })
                    // console.log(result1)
                // })

                // let objhistory = {
                //     iduser: this.props.iduser,
                //     username: this.props.username,
                //     date: new Date().toLocaleString(),
                //     isicart: this.state.rendercart,
                //     order_number: result2.order_number,
                //     total_bayar: this.state.total_bayar
                //     // isicart: this.props.cart,
                // }
            })
        })
    },
    uploadpmt: (req, res) => {
        console.log('req.file')
        console.log(req.file)
        console.log(req.body)
        if (!req.file) {
            res.status(400).send('NO FILE')
        }
        let proof = `${req.file.filename}`

        let getCartTotal = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status, sum(b.total_harga) as total_bayar
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.status='Waiting For Payment';`

        let iduser = `${req.params.iduser}`
        db.query(getCartTotal, (err1, res1) => {
            console.log(res1)
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            let postfotopmt = `update payment_satuan set payment_proof_satuan = ${proof} where order_number= ${db.escape(res1[0].order_number)} AND iduser =${iduser}`
            db.query(postfotopmt, (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }
                console.log(result)
                res.status(200).send({ ongoing: result })
            })
        })
    },
    gettotalBayar: (req, res) => {
        console.log(req.body)
        let getCartTotal = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status, sum(b.total_harga) as total_bayar
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.order_number= ${db.escape(req.body.order_number)} AND a.status='Waiting for Payment';`
        db.query(getCartTotal, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            res.status(200).send(result)
            // res.status(200).send({cart: result[0]})
            console.log(result)
        })
    },
    getOGWaitingForPaymentApproval: (req,res) => {
            let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
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
    }
    
}