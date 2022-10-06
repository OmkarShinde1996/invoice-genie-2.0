const db = require('../routes/db-config')

const getInvoiceDetails = async(req, res) => {
    if(!req.user){
        return res.status(401).json({status:'error', error:`Please login to see your invoices!`})
    } else {
        db.query('SELECT `username` FROM `invoice_info` WHERE `uniqueInvoiceNumber` = ?', [req.body.InvoiceUniqueId], async (err, result) => {
            if (err) throw err
            if (result.length == 0) {
                return res.json({ status: 'error', error: 'No such invoice is saved.' })
            } else { 
                if(result[0].username === req.user.username){
                    db.query('SELECT * FROM invoice_info WHERE uniqueInvoiceNumber = ?', [req.body.InvoiceUniqueId], async(err, result) => {
                        if (err) throw err
                        let user_invoice_data = JSON.parse(JSON.stringify(result));
                        res.json({ status: 'success', success: user_invoice_data[0] })
                    })
                }else{
                    res.json({ status: 'error', error: `You are not an Authorized user!` })
                }
                
            }

        })
    }

}

module.exports = getInvoiceDetails