const jwt = require('jsonwebtoken')
const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')
let getDataOnDemand

const validateJson = async(req,res) =>{
    const dataBody = {
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
    return res.status(200).json({getDataOnDemand})
}

module.exports = {validateJson,getData}