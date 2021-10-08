const multer = require('multer')

const path = require('path') //cari alamat

module.exports = {
    upload : () => {
        let storage = multer.diskStorage({
            destination: path.join(path.resolve('public'), 'images'), //tempat penyimpanan
            // localhost:2000/image
            
            filename : (req, file, cb) => {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) //eror, name
                //IMG-16453271.png

            } 
            //rename file, req: nampung request, file : nyimpann file, cb : template yg digunakan
        })
        return multer({storage}).single('IMG') //.array --> klo mau banyak
        
    }
//   uploadApa : () => {
//         let storage = multer.diskStorage({
//             destination: path.join(path.resolve('public'), 'images', 'namaFoldernyaApa'), //tempat penyimpanan
//             // localhost:2000/image
            
//             filename : (req, file, cb) => {
//                 cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) //eror, name
//                 //IMG-16453271.png

//             } 
//             //rename file, req: nampung request, file : nyimpann file, cb : template yg digunakan
//         })
//         return multer({storage}).single('IMG') //.array --> klo mau banyak
        
//     }
}
