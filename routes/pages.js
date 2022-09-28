const express = require('express')
const router = express.Router()



router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/fillInvoice', (req,res)=>{
    res.render('fill_invoice')
    console.log(req.query);
})

// const getTemplateId = (e)=>{
//     fetch('/clicked', {
//         method: 'POST', 
//         body: JSON.stringify({ id: e.currentTarget.id }),
//     })
// }


module.exports = router