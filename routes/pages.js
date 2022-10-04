const express = require('express')
const router = express.Router()
const loggedIn = require('../controllers/loggedin')
const logout = require('../controllers/logout')


// const validateJson = require('../controllers/validateJson')

let template = ""

router.get('/', loggedIn, (req,res)=>{
    if(req.user){
        res.render('index', {status:'loggedIn', user:req.user})
        console.log(req.user);
    }else{
        res.render('index', {status:'no', user:'nothing'})
        console.log(req.user);
    }
})

router.get('/fillInvoice', loggedIn, (req,res)=>{
    if(req.user){
        res.render('fill_invoice', {status:'loggedIn', user:req.user})

    }else{
        res.render('fill_invoice', {status:'no', user:'nothing'})
    }
    template = req.query.templateId
    console.log(template);

})

router.get('/invoiceGenerated', loggedIn, (req,res)=>{
    console.log(template);
    if(req.user){
        res.render(`${template}`, {status:'loggedIn', user:req.user})
    }else{
        res.render(`${template}`, {status:'no', user:'nothing'})
    }
})

router.get('/myInvoices', loggedIn, (req,res) => {
    if(req.user){
        res.render('myInvoices', {status:'loggedIn', user:req.user})
    }else{
        res.render('myInvoices', {status:'no', user:'nothing'})
    }
    
})


router.get('/logout', logout)

module.exports = {router, template}