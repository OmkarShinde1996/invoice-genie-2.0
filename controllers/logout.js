const logout = (req, resp) => {
    
    console.log(req.rawHeaders[25]);
    resp.clearCookie('userRegistered')

    if(req.rawHeaders[25] === 'https://invoicegenie.onrender.com/myInvoices'){
        resp.redirect('/')
    }else{
        resp.redirect('back')
    }

}
module.exports = logout