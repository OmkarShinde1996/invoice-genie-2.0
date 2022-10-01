const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const register = async(req, resp) => {
    const {username, email, password:Npassword} = req.body
    if(!username || !email || !Npassword) return resp.json({status:'error', error:'Please enter valid username, email and passsword'})
    else if(Npassword.length <= 7) return resp.json({status:'error', error:'Password length should be greater than or equal to 8'})
    else{
        db.query('SELECT `email` FROM `invoicegenieusers` WHERE `email` = ?;SELECT `username` FROM `invoicegenieusers` WHERE `username` = ?', [email, username], async(err, result) => {
            if(err)throw err
            if(result[0].length != 0){
                console.log(result[0]);
                return resp.json({status:'error', error:'Email has already been registered!'})
            }else if(result[1].length != 0){
                return resp.json({status:'error', error:'username has already been registered!'})
            }else{
                const password = await bcrypt.hash(Npassword, 10)
                console.log(password)
                db.query('INSERT INTO invoicegenieusers SET ?', {username:username, email:email, password:password}, (error,results) => {
                    if(error)throw error
                    return resp.json({status:'success', success:'User has been registered!'})
                })
            }
        })
    }
}
module.exports = register