const jwt = require('jsonwebtoken')

let token = jwt.sign({username :'budi'}, 'jcwm17', { expiresIn: '5h' })
console.log(token)

// 👻
//alur Verifikasi
// 1. kita kirim token yg berisi iduser yg sesuai dg iduser sesuai berubah jadi verivied
// 2. jadi yg di verivied tergantung iduser nya
// 3. kirim token lewaat email