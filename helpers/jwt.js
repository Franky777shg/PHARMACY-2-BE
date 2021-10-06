const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        let token = jwt.sign(payload, process.env.FORGOT_PASSWORD_KEY, {expiresIn: '5h'})
        return token
    },
    verifyToken: (req,res,next) => {
        //dokumentasi pake process dan callback. next = middleware sebagai proses tambahan 
        let result = jwt.verify(req.token, process.env.FORGOT_PASSWORD_KEY)
        console.log(result)
        // jwt.verify(req.token, process.env.JWT_KEY, (err, result))
        req.user = result
        next()
    }
}