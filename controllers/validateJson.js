const db = require('../routes/db-config')
let getDataOnDemand
let template = ""
const validateJson = async(req,res) =>{
    template = req.query.templateId
    const dataBody = {
        uniqueInvoiceNumber = Date.now().toString(),
        template = req.body.template,
        additionalNotesObject,
        invoiceDetailsObject,
        termsAndConditionsObject,
        tableArray,
        actualInvoiceText,
        invoiceMoreDetailsObject,
        toDetailsObject,
        logoImageUrl,
        totalTaxObject,
        bankDetailsObject,
        fromDetailsObject
    } = req.body
    const invoiceNoReg = /^[a-zA-Z0-9/-]+$/
    const dateReg = /^[0-9/-]+$/
    const normalTextReg = /^[a-zA-Z]+$/
    const nameReg = /^[a-zA-Z.' ]+$/
    if(!invoiceNoReg.test(dataBody.invoiceDetailsObject["Invoice No."]) || 
    !dateReg.test(dataBody.invoiceDetailsObject["Invoice Date"]) ||
    !normalTextReg.test(dataBody.actualInvoiceText) ||
    !normalTextReg.test(dataBody.toDetailsObject["toTitle"]) ||
    !nameReg.test(dataBody.toDetailsObject["toName"]) ||
    !normalTextReg.test(dataBody.fromDetailsObject["fromTitle"]) ||
    !nameReg.test(dataBody.fromDetailsObject["fromName"])
    ) return res.status(400).json({status:'error', error:`Invalid Request`})
    else{
        getDataOnDemand = dataBody
        return res.status(200).json({status:'success', success:'User entered data received'})
    }
    
}

const getData = async(req,res) =>{
    return res.status(200).json({getDataOnDemand, username: req.user.username})
}



module.exports = {validateJson,getData}