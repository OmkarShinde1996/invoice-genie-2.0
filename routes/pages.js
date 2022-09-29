const express = require('express')
const router = express.Router()
// const validateJson = require('../controllers/validateJson')

let template = ""
let dataCollected

router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/fillInvoice', (req,res)=>{
    res.render('fill_invoice')
    template = req.query.templateId
    dataCollected = req.body
    console.log(template);
})

router.get('/invoiceGenerated', (req,res)=>{
    console.log(template);
    res.render(`${template}`)
})


module.exports = router