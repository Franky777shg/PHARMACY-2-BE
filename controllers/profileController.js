const { db } = require('../database')

module.exports = {
    uploadPhoto: (req, res) => {
        const id = +req.params.id
        console.log('req.file', req.file)

        if(!req.file) {
            res.status(400).send('NO FILE')
        }

        const updatePicture = `update user set profile_picture = 'images/${req.file.filename}' where iduser = ${id};`

        db.query(updatePicture, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('berhasil upload pict')
        })
    }
}