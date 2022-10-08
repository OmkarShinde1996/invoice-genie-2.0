const editinvoiceText = document.querySelector('.invoice-title')
const editimageUrl = document.querySelector('.invoice-logo img')

// Invoice details block elements
const editinvoiceNumber = document.getElementById('invoice-number')
const editinvoiceNumberValue = document.getElementById('invoice-number-value')
const editinvoiceDate = document.getElementById('invoice-date')
const editinvoiceDateValue = document.getElementById('invoice-date-value')
const editdueDateDivCheck = document.getElementById('due-date-div')
const editdueDate = document.getElementById('due-date')
const editdueDateValue = document.getElementById('due-date-value')
// let invoiceDetailsObject = {}

// Invoice more details block elements
const editmoreInfoFieldContainer = document.getElementById('invoice-info-details')
// let invoiceMoreDetailsObject = {}

// From Details elements
const editfromName = document.getElementById('from-name')
const editfromAdd = document.getElementById('from-address')
const editfromCountry = document.getElementById('from-country')
const editfromCity = document.getElementById('from-city')
const editfromZip = document.getElementById('from-zip')
const editfromState = document.getElementById('from-state')
const editfromEmail = document.getElementById('from-email')
const editfromPhone = document.getElementById('from-mobile')
const editfromGst = document.getElementById('from-gst')
const editfromPan = document.getElementById('from-pan')
// let fromDetailsObject = {}

// To Details elements
const edittoName = document.getElementById('to-name')
const edittoAdd = document.getElementById('to-address')
const edittoCountry = document.getElementById('to-country')
const edittoCity = document.getElementById('to-city')
const edittoZip = document.getElementById('to-zip')
const edittoState = document.getElementById('to-state')
const edittoEmail = document.getElementById('to-email')
const edittoPhone = document.getElementById('to-mobile')
const edittoGst = document.getElementById('to-gst')
const edittoPan = document.getElementById('to-pan')
// let toDetailsObject = {}

// Totals Details object
// let totalTaxObject = {}

//Bank details element & object
const editbankDetailsVisible = document.getElementById('bank-details-con')
// let bankDetailsObject = {}

//terms & conditions element & object
const edittermsAndConditionsVisible = document.getElementById('terms-con')
// let termsAndConditionsObject = {}

//Additional notes element & object
const editadditionalNotesVisible = document.getElementById('additional-notes-con')
// let additionalNotesObject = {}


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


            //Setting up the values
            editinvoiceText.innerText = actualInvoiceText_deSerialize
            editimageUrl.src = logoImageUrl_deSerialize['logoUrl']
            editinvoiceNumberValue.value = invoiceDetailsObject_deSerialize['Invoice No.']
            editinvoiceDateValue.value = invoiceDetailsObject_deSerialize['Invoice Date']
            if(Object.keys(invoiceDetailsObject_deSerialize).length === 3){
                editdueDateDivCheck.classList.remove('d-none')
                editdueDateValue.value = invoiceDetailsObject_deSerialize['Due Date']
            }
            if(Object.keys(invoiceMoreDetailsObject_deSerialize).length != 0){
                for(let i=1; i<=Object.keys(invoiceMoreDetailsObject_deSerialize).length; i++){
                    document.querySelector('.add-more-fields-btn').click()
                    document.querySelectorAll('#invoice-number')[i].innerText = Object.keys(invoiceMoreDetailsObject_deSerialize)[0]
                    document.querySelectorAll('#invoice-number-value')[i].value = Object.values(invoiceMoreDetailsObject_deSerialize)[0]
                }
            }
            document.getElementById('from').innerText = fromDetailsObject_deSerialize['fromTitle']
            document.getElementById('to').innerText = toDetailsObject_deSerialize['toTitle']

            //Setting up from details
            editfromName.value = fromDetailsObject_deSerialize['fromName']
            if('fromAddress' in fromDetailsObject_deSerialize){
                editfromAdd.value = fromDetailsObject_deSerialize['fromAddress']
            }
            if('fromCountry' in fromDetailsObject_deSerialize){
                editfromCountry.value = fromDetailsObject_deSerialize['fromCountry']
            }
            if('fromCity' in fromDetailsObject_deSerialize){
                editfromCity.value = fromDetailsObject_deSerialize['fromCity']
            }
            if('fromZip' in fromDetailsObject_deSerialize){
                editfromZip.value = fromDetailsObject_deSerialize['fromZip']
            }
            if('fromState' in fromDetailsObject_deSerialize){
                editfromState.value = fromDetailsObject_deSerialize['fromState']
            }
            if('fromEmail' in fromDetailsObject_deSerialize){
                document.getElementById('from-add-email').click()
                editfromEmail.value = fromDetailsObject_deSerialize['fromEmail']
            }
            if('fromPhone' in fromDetailsObject_deSerialize){
                document.getElementById('from-add-phone').click()
                editfromPhone.value = fromDetailsObject_deSerialize['fromPhone']
            }
            if('fromGst' in fromDetailsObject_deSerialize){
                document.getElementById('from-add-gst').click()
                editfromGst.value = fromDetailsObject_deSerialize['fromGst']
            }
            if('fromPan' in fromDetailsObject_deSerialize){
                document.getElementById('from-add-pan').click()
                editfromPan.value = fromDetailsObject_deSerialize['fromPan']
            }
            


            //Setting up to details
            edittoName.value = toDetailsObject_deSerialize['toName']
            if('toAddress' in toDetailsObject_deSerialize){
                edittoAdd.value = toDetailsObject_deSerialize['toAddress']
            }
            if('toCountry' in toDetailsObject_deSerialize){
                edittoCountry.value = toDetailsObject_deSerialize['toCountry']
            }
            if('toCity' in toDetailsObject_deSerialize){
                edittoCity.value = toDetailsObject_deSerialize['toCity']
            }
            if('toZip' in toDetailsObject_deSerialize){
                edittoZip.value = toDetailsObject_deSerialize['toZip']
            }
            if('toState' in toDetailsObject_deSerialize){
                edittoState.value = toDetailsObject_deSerialize['toState']
            }
            if('toEmail' in toDetailsObject_deSerialize){
                document.getElementById('to-add-email').click()
                edittoEmail.value = toDetailsObject_deSerialize['toEmail']
            }
            if('toPhone' in toDetailsObject_deSerialize){
                document.getElementById('to-add-phone').click()
                edittoPhone.value = toDetailsObject_deSerialize['toPhone']
            }
            if('toGst' in toDetailsObject_deSerialize){
                document.getElementById('to-add-gst').click()
                edittoGst.value = toDetailsObject_deSerialize['toGst']
            }
            if('toPan' in toDetailsObject_deSerialize){
                document.getElementById('to-add-pan').click()
                edittoPan.value = toDetailsObject_deSerialize['toPan']
            }

            //Setting up the set tax dropdown
            if('Total Deductions(Taxes)' in totalTaxObject_deSerialize){
                let index = tableArray_deSerialize[0].length - 4
                let taxName = tableArray_deSerialize[0][index]
                if(taxName == "GST(%)"){
                    document.getElementById('set-tax').selectedIndex = 1
                    document.getElementById('set-tax').dispatchEvent(new Event('change'))
                }else if(taxName == "VAT(%)"){
                    document.getElementById('set-tax').selectedIndex = 2
                    document.getElementById('set-tax').dispatchEvent(new Event('change'))
                }else if(taxName == "PPN(%)"){
                    document.getElementById('set-tax').selectedIndex = 3
                    document.getElementById('set-tax').dispatchEvent(new Event('change'))
                }else if(taxName == "SST(%)"){
                    document.getElementById('set-tax').selectedIndex = 4
                    document.getElementById('set-tax').dispatchEvent(new Event('change'))
                }else if(taxName == "HST(%)"){
                    document.getElementById('set-tax').selectedIndex = 5
                    document.getElementById('set-tax').dispatchEvent(new Event('change'))
                }else if(taxName == "TAX(%)"){
                    document.getElementById('set-tax').selectedIndex = 6
                    document.getElementById('set-tax').dispatchEvent(new Event('change'))
                }
            }

            //Setting up the columns
            if(tableArray_deSerialize[0].length > 5 && 'Total Deductions(Taxes)' in totalTaxObject_deSerialize == false){
                let loopCount = tableArray_deSerialize[0].length - 5
                for(let i = 0; i<loopCount; i++){
                    document.getElementById('add-column').click()
                    document.getElementById(`${i+1}`).innerText = tableArray_deSerialize[0][2+i]
                }
            }

            //Setting up the rows
            if(tableArray_deSerialize.length > 2){
                for(let i = 0; i < tableArray_deSerialize.length-1; i++){
                    document.getElementById('add-new-item-line').click()
                }
            }
            let table = document.querySelector('.table')
            let rowLength = table.rows.length
            for(let i=1; i<=rowLength; i++){
                let cellsLength = table.rows[i].cells.length
                for(let j=1; j<cellsLength; j++){
                    table.rows[i].cells[j].children[0].value = tableArray_deSerialize[i][j]
                }
                document.getElementById('rate').dispatchEvent(new Event('keyup'))
            }
        }
    })
}

getDataFromDB()

// template_deSerialize = data.success.templateId
//             actualInvoiceText_deSerialize = JSON.parse(data.success.actualInvoiceText)
//             invoiceDetailsObject_deSerialize = JSON.parse(data.success.invoiceDetailsObject)
//             invoiceMoreDetailsObject_deSerialize = JSON.parse(data.success.invoiceMoreDetailsObject)
//             logoImageUrl_deSerialize = JSON.parse(data.success.logoImageUrl)
//             fromDetailsObject_deSerialize = JSON.parse(data.success.fromDetailsObject)
//             toDetailsObject_deSerialize = JSON.parse(data.success.toDetailsObject)
//             totalTaxObject_deSerialize = JSON.parse(data.success.totalTaxObject)
//             bankDetailsObject_deSerialize = JSON.parse(data.success.bankDetailsObject)
//             termsAndConditionsObject_deSerialize = JSON.parse(data.success.termsAndConditionsObject)
//             additionalNotesObject_deSerialize = JSON.parse(data.success.additionalNotesObject)
//             tableArray_deSerialize = JSON.parse(data.success.tableArray)