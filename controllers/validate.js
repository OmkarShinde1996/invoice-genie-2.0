const express = require('express')
const validate = require('./validateJson')
const saveDataToDB = require('./addInvoice')
const showInvoices = require('./showInvoices')
const validateJson = validate.validateJson
const getData = validate.getData
const loggedIn = require('./loggedin')
const router = express.Router()

router.post('/validateJson', validateJson)
router.get('/validateJson',loggedIn, getData)
router.post('/saveData',loggedIn,saveDataToDB)
router.get('/myInvoices', loggedIn, showInvoices)

module.exports = router