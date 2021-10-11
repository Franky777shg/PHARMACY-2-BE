const { db } = require('../database')

module.exports = {
    uploadPhoto: (req, res) => {
        const iduser = req.user.iduser
        console.log('req.file', req.file)

        if (!req.file) {
            res.status(400).send('NO FILE')
        }

        const updatePicture = `update user set profile_picture = 'images/photoProfile/${req.file.filename}' where iduser = ${iduser};`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(result)
        })
    },
    deletePhoto: (req, res) => {
        const iduser = req.user.iduser
        const updatePicture = `update user set profile_picture = '' where iduser = ${iduser};`

        db.query(updatePicture, (err, resultdel) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send(resultdel)
        })
    },

}