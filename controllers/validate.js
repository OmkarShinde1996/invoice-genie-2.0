const express = require('express')
const validate = require('./validateJson')
const saveDataToDB = require('./addInvoice')
const showInvoices = require('./showInvoices')
const getInvoiceDetails = require('./getInvoiceDetails')
const deleteInvoice = require('./deleteInvoice')
const validateJson = validate.validateJson
const getData = validate.getData
// const saveDataToDB = validate.saveDataToDB
const loggedIn = require('./loggedin')
const router = express.Router()

router.post('/validateJson', validateJson)
router.get('/validateJson',loggedIn, getData)
router.post('/saveData',loggedIn,saveDataToDB)
router.get('/myInvoices', loggedIn, showInvoices)
router.post('/getInvoiceData', loggedIn, getInvoiceDetails)
router.delete('/deleteInvoice', loggedIn, deleteInvoice)

module.exports = router