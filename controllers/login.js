const jwt = require('jsonwebtoken')
const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const login = async(req,resp) => {
    const {email, password} = req.body
    if(!email || !password) return resp.json({status:'error', error:'Please enter your email and passsword'})
    else{
        db.query('SELECT * FROM invoicegenieusers WHERE email = ?', [email], async (err, result) => {
            if(err) throw err
            if(!result.length || !await bcrypt.compare(password, result[0].password)) return resp.json({status:'error', error:'Incorrect email or password'})
            else{
                const token = jwt.sign({id: result[0].id}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn:process.env.JWT_EXPIRES, //Setting up the token expiry
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), //Converting to milliseconds
                    httpOnly: true
                }
                resp.cookie('userRegistered', token, cookieOptions)
                return resp.json({status:'success', success:'User has been logged in!'})
            }
            
        })
    }
}
module.exports = login