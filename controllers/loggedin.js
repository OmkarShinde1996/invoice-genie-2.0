const db = require('../routes/db-config')
const jwt = require('jsonwebtoken')

const loggedIn = (req, resp, next) => {
    if(!req.cookies.userRegistered)return next()
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.ACCESS_TOKEN_SECRET)
        db.query('SELECT * FROM invoicegenieusers WHERE id = ?', [decoded.id], (err, result) => {
            if(err)return next()
            req.user = result[0]
            return next()
        })
    } catch (err) {
        if(err) return next()
    }
}
module.exports = loggedIn