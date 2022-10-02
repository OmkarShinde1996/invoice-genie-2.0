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
    return res.status(200).json({getDataOnDemand, username: req.user.username})
}


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
            return resp.json({status:'error', error:'You are not a registered user. Please Sign up first'})
        }else{
            var uniqueInvoiceNumber = Date.now().toString()
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
                db.query('INSERT INTO invoice_info SET ?', {username:username, uniqueInvoiceNumber:uniqueInvoiceNumber, additionalNotesObject:JSON.stringify(additionalNotesObject),invoiceDetailsObject:JSON.stringify(invoiceDetailsObject),termsAndConditionsObject:JSON.stringify(termsAndConditionsObject),tableArray:JSON.stringify(tableArray),actualInvoiceText:JSON.stringify(actualInvoiceText),invoiceMoreDetailsObject:JSON.stringify(invoiceMoreDetailsObject),toDetailsObject:JSON.stringify(toDetailsObject),logoImageUrl:JSON.stringify(logoImageUrl),totalTaxObject:JSON.stringify(totalTaxObject),bankDetailsObject:JSON.stringify(bankDetailsObject),fromDetailsObject:JSON.stringify(fromDetailsObject)}, (error,results) => {
                    if(error)throw error
                    return res.status(201).json({ status: 'success', success: 'Invoice saved successfuly!' })
                })
            }
        }
    })

}





const showInvoices = async(req, res) => {
    if(!req.user){
        return res.status(401).json({status:'error', error:`Please login to see your invoices!`})
    }else{
        db.query('SELECT * FROM invoice_info WHERE username = ?', [req.user.username], async(err, result) => {
            let user_invoice_data = JSON.parse(JSON.stringify(result));
            const invoiceData = {
                headers:['Invoice No.', 'From Name', 'To Name', 'Invoice Date'],
                rows: new Array(3).fill(undefined).map(() => {
                    return [
                        JSON.parse(user_invoice_data[0].invoiceDetailsObject)['Invoice No.'],
                        JSON.parse(user_invoice_data[0].fromDetailsObject)['fromName'],
                        JSON.parse(user_invoice_data[0].toDetailsObject)['toName'],
                        JSON.parse(user_invoice_data[0].invoiceDetailsObject)['Invoice Date'],
                    ]
                })
            }
            res.json({invoiceData})
        })
    }

}


module.exports = {validateJson,getData,saveDataToDB,showInvoices}