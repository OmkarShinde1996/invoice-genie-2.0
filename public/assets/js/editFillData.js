let template_deSerialize
let actualInvoiceText_deSerialize
let invoiceDetailsObject_deSerialize
let invoiceMoreDetailsObject_deSerialize
let logoImageUrl_deSerialize
let fromDetailsObject_deSerialize
let toDetailsObject_deSerialize
let totalTaxObject_deSerialize
let bankDetailsObject_deSerialize
let termsAndConditionsObject_deSerialize
let additionalNotesObject_deSerialize
let tableArray_deSerialize

const getDataFromDB = () => {
    const uniqueInvoiceId = {
        InvoiceUniqueId: sessionStorage.getItem('selectedInvoiceUniqueId')
    }
    fetch('/api/getInvoiceData', {
        method: 'POST',
        body: JSON.stringify(uniqueInvoiceId),
        headers:{
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(data => {
        if(data.status == 'error'){
            console.log(data.error)
        }else{
            console.log(data.success)
            template_deSerialize = data.success.templateId
            actualInvoiceText_deSerialize = JSON.parse(data.success.actualInvoiceText)
            invoiceDetailsObject_deSerialize = JSON.parse(data.success.invoiceDetailsObject)
            invoiceMoreDetailsObject_deSerialize = JSON.parse(data.success.invoiceMoreDetailsObject)
            logoImageUrl_deSerialize = JSON.parse(data.success.logoImageUrl)
            fromDetailsObject_deSerialize = JSON.parse(data.success.fromDetailsObject)
            toDetailsObject_deSerialize = JSON.parse(data.success.toDetailsObject)
            totalTaxObject_deSerialize = JSON.parse(data.success.totalTaxObject)
            bankDetailsObject_deSerialize = JSON.parse(data.success.bankDetailsObject)
            termsAndConditionsObject_deSerialize = JSON.parse(data.success.termsAndConditionsObject)
            additionalNotesObject_deSerialize = JSON.parse(data.success.additionalNotesObject)
            tableArray_deSerialize = JSON.parse(data.success.tableArray)
        }
    })
}

getDataFromDB()

window.onload = function fillInvoiceInfo(){
    const invoiceObj = {
        template_deSerialize,
        actualInvoiceText_deSerialize,
        invoiceDetailsObject_deSerialize,
        invoiceMoreDetailsObject_deSerialize,
        logoImageUrl_deSerialize,
        fromDetailsObject_deSerialize,
        toDetailsObject_deSerialize,
        totalTaxObject_deSerialize,
        bankDetailsObject_deSerialize,
        termsAndConditionsObject_deSerialize,
        additionalNotesObject_deSerialize,
        tableArray_deSerialize,
    }
    console.log(invoiceObj);
}