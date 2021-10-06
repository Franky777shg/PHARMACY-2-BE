const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        let token = jwt.sign(payload, process.env.RESET_PASSWORD_KEY, {expiresIn: '5h'})
        return token
    }
}