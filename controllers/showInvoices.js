const db = require('../routes/db-config')

const showInvoices = async(req, res) => {
    if(!req.user){
        return res.status(401).json({status:'error', error:`Please login to see your invoices!`})
    } else {
        db.query('SELECT `username` FROM `invoicegenieusers` WHERE `username` = ?', [req.user.username], async (err, result) => {
            if (err) throw err
            if (result[0].length == 0) {
                return res.json({ status: 'error', error: 'You are not a registered user. Please Sign up first' })
            } else { 
                db.query('SELECT * FROM invoice_info WHERE username = ?', [req.user.username], async(err, result) => {
                    let user_invoice_data = JSON.parse(JSON.stringify(result));
                    let dataArray = []
                    let templateArray = []

                    for(let i=0; i<user_invoice_data.length; i++){
                        let subDataArray = []
                        let templateId = []
                        templateId.push(user_invoice_data[i].templateId)
                        subDataArray.push(JSON.parse(user_invoice_data[i].uniqueInvoiceNumber))
                        subDataArray.push(JSON.parse(user_invoice_data[i].invoiceDetailsObject)['Invoice No.'])
                        subDataArray.push(JSON.parse(user_invoice_data[i].fromDetailsObject)['fromName'])
                        subDataArray.push(JSON.parse(user_invoice_data[i].toDetailsObject)['toName'])
                        subDataArray.push(JSON.parse(user_invoice_data[i].invoiceDetailsObject)['Invoice Date'])
                        dataArray.push(subDataArray)
                        templateArray.push(templateId)
                    }
                    const invoiceData = {
                        headers:['Unique ID','Invoice No.', 'From Name', 'To Name', 'Invoice Date', 'Actions'],
                        rows: dataArray,
                        templates: templateArray,
                    }
                    res.json({
                        headers: invoiceData.headers,
                        rows: invoiceData.rows,
                        templates: invoiceData.templates,
                        lastUpdated: new Date().toLocaleString()
                    })
                })
            }

        })
    }

}

module.exports = showInvoices