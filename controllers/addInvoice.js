const db = require('../routes/db-config')

const saveDataToDB = async(req, res) => {
    console.log(req.user);
    if(!req.user){
        return res.status(401).json({status:'error', error:`You must login before saving your invoice`})
    }else{
        var username = req.user.username
    }

    db.query('SELECT `username` FROM `invoicegenieusers` WHERE `username` = ?', [username], async(err, result) => {
        if(err)throw err
        if(result[0].length == 0){
            return res.json({status:'error', error:'You are not a registered user. Please Sign up first'})
        }else{
            var uniqueInvoiceNumber = Date.now().toString()
            var template = req.body.template
            var additionalNotesObject = req.body.additionalNotesObject
            var invoiceDetailsObject = req.body.invoiceDetailsObject
            var termsAndConditionsObject = req.body.termsAndConditionsObject
            var tableArray = req.body.tableArray
            var actualInvoiceText = req.body.actualInvoiceText
            var invoiceMoreDetailsObject = req.body.invoiceMoreDetailsObject
            var toDetailsObject = req.body.toDetailsObject
            var logoImageUrl = req.body.logoImageUrl
            var totalTaxObject = req.body.totalTaxObject
            var bankDetailsObject = req.body.bankDetailsObject
            var fromDetailsObject = req.body.fromDetailsObject

            const invoiceNoReg = /^[a-zA-Z0-9/-]+$/
            const dateReg = /^[0-9/-]+$/
            const normalTextReg = /^[a-zA-Z]+$/
            const nameReg = /^[a-zA-Z.' ]+$/
            if(!username || username == "") return res.json({status:'error', error:'You must login before saving your invoice'})
            else if(!invoiceNoReg.test(invoiceDetailsObject["Invoice No."]) || 
            !dateReg.test(invoiceDetailsObject["Invoice Date"]) ||
            !normalTextReg.test(actualInvoiceText) ||
            !normalTextReg.test(toDetailsObject["toTitle"]) ||
            !nameReg.test(toDetailsObject["toName"]) ||
            !normalTextReg.test(fromDetailsObject["fromTitle"]) ||
            !nameReg.test(fromDetailsObject["fromName"])
            ) {
                return res.status(400).json({status:'error', error:`Please provide proper inputs.`})
            }
            else{
                db.query('INSERT INTO invoice_info SET ?', {username:username, templateId:template, uniqueInvoiceNumber:uniqueInvoiceNumber, additionalNotesObject:JSON.stringify(additionalNotesObject),invoiceDetailsObject:JSON.stringify(invoiceDetailsObject),termsAndConditionsObject:JSON.stringify(termsAndConditionsObject),tableArray:JSON.stringify(tableArray),actualInvoiceText:JSON.stringify(actualInvoiceText),invoiceMoreDetailsObject:JSON.stringify(invoiceMoreDetailsObject),toDetailsObject:JSON.stringify(toDetailsObject),logoImageUrl:JSON.stringify(logoImageUrl),totalTaxObject:JSON.stringify(totalTaxObject),bankDetailsObject:JSON.stringify(bankDetailsObject),fromDetailsObject:JSON.stringify(fromDetailsObject)}, (error,results) => {
                    if(error)throw error
                    return res.status(201).json({ status: 'success', success: 'Invoice saved successfuly!' })
                })
            }
        }
    })
}

module.exports = saveDataToDB