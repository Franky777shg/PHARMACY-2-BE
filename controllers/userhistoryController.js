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
    toComplete1: (req, res) => {
        console.log(req.body)
        console.log(req.body.order_number, 'ordernumbercomplete')
        // const {iduser} = req.body
        //ambil ordernumber status cart
    //     let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
    // from order_satuan a
    // inner join order_detail_satuan b
    // on a.order_number=b.order_number
    // where a.iduser=${req.params.iduser} AND a.status='Sending Package';`
    //     db.query(getCart, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //             res.status(400).send(err)
    //         }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Complete' where order_number=${db.escape(req.body.order_number)} AND iduser=${req.params.iduser}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ history: result1 })
                console.log(result1)
            })
        // })
    },toCompleteR: (req, res) => {
        console.log(req.body)
        console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
    //     let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
    // from order_satuan a
    // inner join order_detail_satuan b
    // on a.order_number=b.order_number
    // where a.iduser=${req.params.iduser} AND a.status='Sending Package';`
    //     db.query(getCart, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //             res.status(400).send(err)
    //         }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_resep set status='Complete' where order_number=${db.escape(req.body.order_number)} AND iduser=${req.params.iduser}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ history: result1 })
                console.log(result1)
            })
        // })
    },
    getonGoing: (req, res) => {
        console.log(req.body)
        //ambil ordernumber status cart
        let tempArr = []
        // let getonGoing = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
        let getonGoing = `select a.order_number
            from order_satuan a
            inner join order_detail_satuan b
            on a.order_number=b.order_number
            where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} group by a.order_number;`

        db.query(getonGoing, async (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            let allArr = []
            console.log(result)
            await result.forEach(item => {
                // console.log('foreach jalan')
                // console.log(allArr)
                let datatransaksi = `select * from order_satuan where order_number = ${db.escape(item.order_number)} and iduser=${req.params.iduser}`
                db.query(datatransaksi, (err1, res1) => {
                    if (err1) {
                        console.log(err1)
                        res.status(400).send(err1)
                    }
                    console.log(res1, 'res1')
                    res1[0].products = []
                    // allArr.push(res1[0])
                    // console.log('allArr', allArr)
                    let total_bayar = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date, sum(b.total_harga) as total_bayar
                    from order_satuan a
                    inner join order_detail_satuan b
                    on a.order_number=b.order_number
                    where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(item.order_number)};`
                    db.query(total_bayar, (err2, res2) => {
                        if (err2) {
                            console.log(err2)
                        }
                        console.log(res2)

                        // allArr.push(res1[0],res1[0].total_bayar=res2[0].total_bayar)
                        console.log(res1[0].total_bayar)
                        res1[0].total_bayar = res2[0].total_bayar
                        // console.log(res1[0].total_bayar)

                        allArr.push(res1[0])
                        let detailproduk = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
                    from order_satuan a
                    inner join order_detail_satuan b
                    on a.order_number=b.order_number
                    where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(item.order_number)};`
                        db.query(detailproduk, (err3, res3) => {
                            if (err3) {
                                console.log(err3)
                                res.status(400).send(err3)
                            }
                            res1[0].products = res3
                            // allArr.res1[0].products.push(res3)
                            console.log(res3)
                            tempArr = allArr
                            console.log(allArr, 'a')
                            db.query(datatransaksi, (err4, res4) => {
                                res.status(200).send(tempArr)
                            })
                        })
                    })

                })


            })
            // console.log('foreach selesai')
            //     result.forEach(item => {
            //         // tempArr.push({order_number:item.order_number, date: item.date, status:item.status})
            //         // tempArr.push([[item.order_number], [item.date],[item.status]])
            //         let orderdetail = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
            // from order_satuan a
            // inner join order_detail_satuan b
            // on a.order_number=b.order_number
            // where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(item.order_number)};`
            //         let total_bayar = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date, sum(b.total_harga) as total_bayar
            // from order_satuan a
            // inner join order_detail_satuan b
            // on a.order_number=b.order_number
            // where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(item.order_number)};`

            //         db.query(total_bayar, (err1, res1) => {
            //             console.log('totalbayar')
            //             // tempArr.push({total_bayar: res1[0].total_bayar})
            //             if (err1) {
            //                 console.log(err1)
            //                 res.status(400).send(err1)
            //             }
            //             console.log(res1[0].total_bayar)

            //             db.query(orderdetail, (err2, res2) => {
            //                 allArr.push({ order_number: item.order_number, date: item.date, status: item.status, total_bayar: res1[0].total_bayar, detailproduk: res2 })
            //                 console.log('orderdetail')
            //                 console.log(res2)
            //                 console.log('a', allArr)
            //             })
            //         })
            //     })

            //         console.log(tempArr)

            //         tempArr.map((item,index) => {
            //             // console.log(item,index)
            //             console.log(item[index[0]])

            // })
            // tempArr.push({order_number:result[0].order_number,idproduk:result[0].idproduk,date:result[0].date,cart:result})
            // tempArr.push({ order_number: result[0].order_number, idproduk: result[0].idproduk, date: result[0].date, total_bayar: res1[0].total_bayar, status: res1[0].status, cart: result })

            // res.status(200).send({hasilongoing: result})
            // console.log(result[0].total_bayar)
        })
    },
    getHistory: (req, res) => {
        console.log(req.body)
        // console.log(req.params.iduser)
        // const {iduser} = req.body
        //ambil ordernumber status cart
        let getHist = `select a.order_number
    from order_satuan a
    inner join order_detail_satuan b
    on a.order_number=b.order_number
    where a.iduser=${req.params.iduser} AND a.status='Complete' group by a.order_number;`
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
            let postfotopmt = `update payment_satuan set payment_proof_satuan = ${db.escape(proof)} where order_number= ${db.escape(res1[0].order_number)} AND iduser =${iduser}`
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
    getOGWaitingForPaymentApproval: (req, res) => {
        console.log(req.body)
        let getCart = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
        from order_satuan a
        inner join order_detail_satuan b
        on a.order_number=b.order_number
        where a.iduser=${req.params.iduser} AND a.status='Waiting For Payment';`
        // db.query(getCart, (err, result) => {
        //     if (err) {
        //         console.log(err)
        //         res.status(400).send(err)
        //     }
            // res.status(200).send({cart: result})
            //edit ordernumber status ubah dr cart jd ongoing
            let posthistory = `update order_satuan set status='Waiting For Payment Approval' where order_number=${db.escape(req.body.order_number)}`
            db.query(posthistory, (err1, result1) => {
                if (err1) {
                    console.log(err1)
                    res.status(400).send(err1)
                }
                res.status(200).send({ ongoing: result1 })
                console.log(result1)
            })
        // })
    },
    getordernumber: (req, res) => {
        let getordernumber = `select a.order_number
            from order_satuan a
            inner join order_detail_satuan b
            on a.order_number=b.order_number
            where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} group by a.order_number;`
        db.query(getordernumber, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            res.status(200).send(res1)
        })
    },
    datatransaksi: (req, res) => {
        console.log(req.body)
        let allArr = []
        let datatransaksi = `select * from order_satuan where order_number = ${db.escape(req.body.order_number)} and iduser=${req.params.iduser}`
        db.query(datatransaksi, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            console.log(res1, 'res1')
            res1[0].products = []
            // res1[0].total_bayar = null
            allArr.push(res1[0])
            // console.log('allArr', allArr)
            let total_bayar = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date, sum(b.total_harga) as total_bayar
                    from order_satuan a
                    inner join order_detail_satuan b
                    on a.order_number=b.order_number
                    where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
            db.query(total_bayar, (err2, res2) => {
                if (err2) {
                    console.log(err2)
                }
                // console.log(res2)

                // allArr.push(res1[0],res1[0].total_bayar=res2[0].total_bayar)
                // console.log(res1[0].total_bayar)
                res1[0].total_bayar = res2[0].total_bayar
                // console.log(res1[0].total_bayar)
                // console.log(allArr,'allarr')
                // allArr.push(res1[0])
                let detailproduk = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
                    from order_satuan a
                    inner join order_detail_satuan b
                    on a.order_number=b.order_number
                    where a.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
                db.query(detailproduk, (err3, res3) => {
                    if (err3) {
                        console.log(err3)
                        res.status(400).send(err3)
                    }
                    res1[0].products = res3
                    // allArr.res1[0].products.push(res3)
                    // console.log(res3)
                    console.log(allArr, 'a')

                    res.status(200).send(allArr)

                })
            })
        })
    },
    getordernumberR: (req, res) => {
        let getordernumberR = `select a.order_number
            from order_resep a
            inner join order_detail_resep b
            on a.order_number=b.order_number
            where a.status IN ('Waiting For Approval', 'Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND a.iduser=${req.params.iduser} group by a.order_number;`
        db.query(getordernumberR, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            res.status(200).send(res1)
        })
    },
    datatransaksiR: (req, res) => {
        console.log(req.body)
        let allArr = []
        let datatransaksi = `select * from order_resep where order_number = ${db.escape(req.body.order_number)} and iduser=${req.params.iduser}`
        db.query(datatransaksi, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            console.log(res1, 'res1')
            res1[0].products = []
            // res1[0].total_bayar = null
            allArr.push(res1[0])
            let total_bayar = `select a.total_belanja, b.status
                    from payment_resep a
                    inner join order_resep b
                    on a.order_number=b.order_number
                    where b.status IN ('Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND b.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
            let detailproduk = `select *
                        from order_detail_resep a
                        inner join order_resep b
                        on a.order_number=b.order_number
                        where b.status IN ('Waiting For Approval','Waiting For Payment', 'Waiting For Payment Approval', 'Sending Package', 'Processing') AND b.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
            // console.log('allArr', allArr)
            
            if (res1[0].status ==='Waiting For Approval'){
                db.query(detailproduk, (err3, res3) => {
                    if (err3) {
                        console.log(err3)
                        res.status(400).send(err3)
                    }
                    res1[0].products = res3
                    // allArr.res1[0].products.push(res3)
                    // console.log(res3)
                    console.log(allArr, 'a')

                    res.status(200).send(allArr)

                })
            }
            else{
                db.query(total_bayar, (err2, res2) => {
                    if (err2) {
                        console.log(err2)
                    }
                    console.log(res2)

                    // allArr.push(res1[0],res1[0].total_bayar=res2[0].total_bayar)
                    // console.log(res1[0].total_bayar)
                    res1[0].total_belanja = res2[0].total_belanja
                    // console.log(res1[0].total_bayar)
                    // console.log(allArr,'allarr')
                    // allArr.push(res1[0])
                    db.query(detailproduk, (err3, res3) => {
                        if (err3) {
                            console.log(err3)
                            res.status(400).send(err3)
                        }
                        res1[0].products = res3
                        // allArr.res1[0].products.push(res3)
                        // console.log(res3)
                        console.log(allArr, 'a')

                        res.status(200).send(allArr)

                    })
                })
            }
        })
    },
    datahistory1: (req, res) => {
        console.log(req.body)
        let allArr = []
        let datatransaksi = `select * from order_satuan where order_number = ${db.escape(req.body.order_number)} and iduser=${req.params.iduser}`
        db.query(datatransaksi, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            console.log(res1, 'res1')
            res1[0].products = []
            // res1[0].total_bayar = null
            allArr.push(res1[0])
            // console.log('allArr', allArr)
            let total_bayar = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date, sum(b.total_harga) as total_bayar
                    from order_satuan a
                    inner join order_detail_satuan b
                    on a.order_number=b.order_number
                    where a.status IN ('Complete') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
            db.query(total_bayar, (err2, res2) => {
                if (err2) {
                    console.log(err2)
                }
                // console.log(res2)
                res1[0].total_bayar = res2[0].total_bayar
                // console.log(res1[0].total_bayar)
                // console.log(allArr,'allarr')
                // allArr.push(res1[0])
                let detailproduk = `select a.order_number,b.idproduk,b.nama,b.product_image,b.qty_beli,b.harga,b.total_harga,a.status,a.date
                    from order_satuan a
                    inner join order_detail_satuan b
                    on a.order_number=b.order_number
                    where a.status IN ('Complete') AND a.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
                db.query(detailproduk, (err3, res3) => {
                    if (err3) {
                        console.log(err3)
                        res.status(400).send(err3)
                    }
                    res1[0].products = res3
                    // allArr.res1[0].products.push(res3)
                    // console.log(res3)
                    console.log(allArr, 'a')

                    res.status(200).send(allArr)

                })
            })
        })
    },
    getONhistoryR: (req, res) => {
        let getordernumberR = `select a.order_number
            from order_resep a
            inner join order_detail_resep b
            on a.order_number=b.order_number
            where a.status IN ('Complete') AND a.iduser=${req.params.iduser} group by a.order_number;`
        db.query(getordernumberR, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            res.status(200).send(res1)
        })
    },
    datahistoryr: (req, res) => {
        console.log(req.body)
        let allArr = []
        let datatransaksi = `select * from order_resep where order_number = ${db.escape(req.body.order_number)} and iduser=${req.params.iduser}`
        db.query(datatransaksi, (err1, res1) => {
            if (err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            console.log(res1, 'res1')
            res1[0].products = []
            // res1[0].total_bayar = null
            allArr.push(res1[0])
            // console.log('allArr', allArr)
            let total_bayar = `select a.total_belanja, b.status
                    from payment_resep a
                    inner join order_resep b
                    on a.order_number=b.order_number
                    where b.status IN ('Complete', 'Cancel') AND b.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
            db.query(total_bayar, (err2, res2) => {
                if (err2) {
                    console.log(err2)
                }
                // console.log(res2)
                res1[0].total_belanja = res2[0].total_belanja
                // console.log(res1[0].total_bayar)
                // console.log(allArr,'allarr')
                // allArr.push(res1[0])
                let detailproduk = `select *
                from order_detail_resep a
                inner join order_resep b
                on a.order_number=b.order_number
                where b.status IN ('Complete', 'Cancel') AND b.iduser=${req.params.iduser} AND a.order_number=${db.escape(req.body.order_number)};`
                db.query(detailproduk, (err3, res3) => {
                    if (err3) {
                        console.log(err3)
                        res.status(400).send(err3)
                    }
                    res1[0].products = res3
                    // allArr.res1[0].products.push(res3)
                    // console.log(res3)
                    console.log(allArr, 'a')

                    res.status(200).send(allArr)

                })
            })
        })
    }
}