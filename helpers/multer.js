const multer = require('multer')

const path = require('path') //cari alamat

module.exports = {
    uploadPhoto: () => {
        let storage = multer.diskStorage({
            destination: path.join(path.resolve('public'), 'images', 'photoProfile'), //tempat penyimpanan
            // localhost:2000/image

            filename: (req, file, cb) => {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) //eror, name
                //IMG-16453271.png

            }
            //rename file, req: nampung request, file : nyimpann file, cb : template yg digunakan
        })
        return multer({ storage }).single('IMG') //.array --> klo mau banyak

    },
    uploadp1: () => {
        let storage = multer.diskStorage({
            destination: path.join(path.resolve('public'), 'images', 'produk_satuan'), //tempat penyimpanan
            // localhost:2000/image

            filename: (req, file, cb) => {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) //eror, name
                //IMG-16453271.png

            }
            //rename file, req: nampung request, file : nyimpann file, cb : template yg digunakan
        })

        return multer({storage}).single('IMG') //.array --> klo mau banyak
        
    },
    uploadpr : () => {
        let storage = multer.diskStorage({
            destination: path.join(path.resolve('public'), 'images', 'produk_resep'), //tempat penyimpanan
            // localhost:2000/image
            
            filename : (req, file, cb) => {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) //eror, name
                //IMG-16453271.png

            } 
            //rename file, req: nampung request, file : nyimpann file, cb : template yg digunakan
        })
        return multer({storage}).single('IMG') //.array --> klo mau banyak
        
    },
    uploadImageResep: () => {
        let storage = multer.diskStorage({
            destination: path.join(path.resolve('public'), 'images', 'photoResep'),

            filename: (req, file, cb) => {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))

            }
        })
        return multer({ storage }).single('IMG')

    },

}
