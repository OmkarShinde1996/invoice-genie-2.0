
// Logo Image and Invoice Text block element
let actualInvoiceText
const invoiceBody = document.querySelector('invoice-logo')
const previousImgUrl = "https://omkarshinde1996.github.io/invoice-genie/assets/images/image-placeholder1.png"
let logoImageUrl = {}

// Invoice details block elements
const invoiceNumber = document.getElementById('invoice-number').innerText
const invoiceNumberValue = document.getElementById('invoice-number-value')
const invoiceDate = document.getElementById('invoice-date').innerText
const invoiceDateValue = document.getElementById('invoice-date-value')
const dueDateDivCheck = document.getElementById('due-date-div')
const dueDate = document.getElementById('due-date').innerText
const dueDateValue = document.getElementById('due-date-value')
let invoiceDetailsObject = {}

// Invoice more details block elements
const moreInfoFieldContainer = document.getElementById('invoice-info-details')
let invoiceMoreDetailsObject = {}

// From Details elements
const fromName = document.getElementById('from-name')
const fromAdd = document.getElementById('from-address')
const fromCountry = document.getElementById('from-country')
const fromCity = document.getElementById('from-city')
const fromZip = document.getElementById('from-zip')
const fromState = document.getElementById('from-state')
const fromEmail = document.getElementById('from-email')
const fromPhone = document.getElementById('from-mobile')
const fromGst = document.getElementById('from-gst')
const fromPan = document.getElementById('from-pan')
let fromDetailsObject = {}

// To Details elements
const toName = document.getElementById('to-name')
const toAdd = document.getElementById('to-address')
const toCountry = document.getElementById('to-country')
const toCity = document.getElementById('to-city')
const toZip = document.getElementById('to-zip')
const toState = document.getElementById('to-state')
const toEmail = document.getElementById('to-email')
const toPhone = document.getElementById('to-mobile')
const toGst = document.getElementById('to-gst')
const toPan = document.getElementById('to-pan')
let toDetailsObject = {}

// Totals Details object
let totalTaxObject = {}

//Bank details element & object
const bankDetailsVisible = document.getElementById('bank-details-con')
let bankDetailsObject = {}

//terms & conditions element & object
const termsAndConditionsVisible = document.getElementById('terms-con')
let termsAndConditionsObject = {}

//Additional notes element & object
const additionalNotesVisible = document.getElementById('additional-notes-con')
let additionalNotesObject = {}


///////////////////////////////////////////////////////////////
function allInOnePack(){
    makeVariableOfActualInvoiceText()
    makeObjectOfInvoiceDetails()
    makeObjectOfInvoiceMoreDetails()
    makeLogoImageObject()
    makeFromDetailsObject()
    makeToDetailsObject()
    makeTotalTaxObject()
    makeBankDetailsObject()
    makeTermsAndConditionsObject()
    makeAdditionalNotesObject()
    makeTableArray()
    getRequiredFields()
    storeDataInSessionStorage()
}
///////////////////////////////////////////////////////////////

function makeVariableOfActualInvoiceText(){
    if(document.querySelector('.invoice-title').innerText == ""){
        actualInvoiceText = 'Invoice'
    }else{
        actualInvoiceText = document.querySelector('.invoice-title').innerText
        // console.log(actualInvoiceText)
    }
}

function makeObjectOfInvoiceDetails(){
    invoiceDetailsObject = {
        [`${invoiceNumber}`]:`${invoiceNumberValue.value}`,
        [`${invoiceDate}`]:`${invoiceDateValue.value}`
    }

    if(dueDateDivCheck.classList.contains('d-none') == false){
        invoiceDetailsObject[`${dueDate}`] = `${dueDateValue.value}`
    }
    // console.log(invoiceDetailsObject)
}

function makeObjectOfInvoiceMoreDetails(){
    if(moreInfoFieldContainer.innerHTML != ""){
        let count = moreInfoFieldContainer.childElementCount
        for(let i = 0; i < count; i++){
            let moreDetailsFieldTitle = moreInfoFieldContainer.children[i].children[0].innerText
            let moreDetailsFieldValue = moreInfoFieldContainer.children[i].children[1].firstElementChild.value
            invoiceMoreDetailsObject[`${moreDetailsFieldTitle}`] = `${moreDetailsFieldValue}`
        }

    }
    // console.log(invoiceMoreDetailsObject)
}

function makeLogoImageObject(){
    const imageUrl = document.querySelector('.invoice-logo img').src
    if(imageUrl != previousImgUrl){
        logoImageUrl.logoUrl = imageUrl
    }
    // console.log(logoImageUrl)
}

function makeFromDetailsObject(){
    let fromText = document.getElementById('from').innerText
    fromDetailsObject = {
        fromTitle : `${fromText}`,
        fromName : `${fromName.value}`,
        fromAddress : `${fromAdd.value}`,
        fromCity : `${fromCity.value}`,
        fromState : `${fromState.value}`,
        fromCountry : `${fromCountry.value}`,
        fromZip : `${fromZip.value}`
    }

    if(fromEmail.classList.contains('d-none') == false){
        fromDetailsObject.fromEmail = `${fromEmail.value}`
    }
    if(fromPhone.classList.contains('d-none') == false){
        fromDetailsObject.fromPhone = `${fromPhone.value}`
    }
    if(fromGst.classList.contains('d-none') == false){
        fromDetailsObject.fromGst = `${fromGst.value}`
    }
    if(fromPan.classList.contains('d-none') == false){
        fromDetailsObject.fromPan = `${fromPan.value}`
    }

    // console.log(fromDetailsObject)
}

function makeToDetailsObject(){
    let toText = document.getElementById('to').innerText
    toDetailsObject = {
        toTitle : `${toText}`,
        toName : `${toName.value}`,
        toAddress : `${toAdd.value}`,
        toCity : `${toCity.value}`,
        toState : `${toState.value}`,
        toCountry : `${toCountry.value}`,
        toZip : `${toZip.value}`
    }

    if(toEmail.classList.contains('d-none') == false){
        toDetailsObject.toEmail = `${toEmail.value}`
    }
    if(toPhone.classList.contains('d-none') == false){
        toDetailsObject.toPhone = `${toPhone.value}`
    }
    if(toGst.classList.contains('d-none') == false){
        toDetailsObject.toGst = `${toGst.value}`
    }
    if(toPan.classList.contains('d-none') == false){
        toDetailsObject.toPan = `${toPan.value}`
    }

    // console.log(toDetailsObject)
}

function makeTotalTaxObject(){
    if(selectedTaxIndex != 0 && selectedTaxIndex != undefined && document.querySelector('.tax-total-amount-cal') != null){
        // const totalTaxTitle = document.querySelector('.tax-headline')
        const totalTaxTitle = "Total Deductions(Taxes)"
        const totalTaxAmountCalculated = document.querySelector('.tax-total-amount-cal')
        // console.log(totalTaxAmountCalculated)
        totalTaxObject[`${totalTaxTitle}`] = `&#8377; ${totalTaxAmountCalculated.innerText}`
    }
    const discountText = document.getElementById('discount-text')
    const discountAmount = document.getElementById('discount-amount')
    const subTotalAmt = document.getElementById('sub-total-amount').innerText
    const totalRoundUp = document.getElementById('total')
    const totalRoundUpAmount = document.getElementById('total-amount')
    totalTaxObject[`${discountText.innerText}`] = `-&#8377; ${discountAmount.value}`
    totalTaxObject.subTotal = `&#8377; ${subTotalAmt}`
    totalTaxObject[`${totalRoundUp.innerText}`] = `&#8377; ${totalRoundUpAmount.innerText}`
    // console.log(totalTaxObject)
}

function makeBankDetailsObject(){
    if(!bankDetailsVisible.classList.contains('d-none')){
        bankDetailsObject['Account Holder Name'] = document.getElementById('account-name').value
        bankDetailsObject['Account Number'] = document.getElementById('account-number').value
        bankDetailsObject['Bank IFSC'] = document.getElementById('account-ifsc').value
        bankDetailsObject['Account Type'] = document.getElementById('account-type').value
        bankDetailsObject['Bank Name'] = document.getElementById('bank-name').value
        bankDetailsObject['UPI ID'] = document.getElementById('upi-id').value
    }else{
        bankDetailsObject = {}
    }
    // console.log(bankDetailsObject)
}

function makeTermsAndConditionsObject(){
    if(!termsAndConditionsVisible.classList.contains('d-none')){
        termsAndConditionsObject['Terms & Conditions'] = document.getElementById('terms-conditions').value
    }else{
        termsAndConditionsObject = {}
    }
    // console.log(termsAndConditionsObject)
}

function makeAdditionalNotesObject(){
    if(!additionalNotesVisible.classList.contains('d-none')){
        additionalNotesObject['Additional Notes'] = document.getElementById('additional-notes-text-area').value
    }else{
        additionalNotesObject = {}
    }
    // console.log(additionalNotesObject)
}


/////////////////////////// Function to convert Table to array//////////////////////////

let tableArray

function makeTableArray(){
    function tableToArray(table){
        let data = []
        let rowLength = table.rows.length
        //Cpturing the header titles and storing it in data array on 0th index
        let headersTitles = []
        for(let x=0; x<table.rows[0].cells.length; x++){
            headersTitles[x] = table.rows[0].cells[x].innerText
        }
        data.push(headersTitles)
        //Capturing the row cells values and storing it in data array from 1st index
        for(let i=1; i<rowLength; i++){
            let cellsLength = table.rows[i].cells.length
            let headers = []
            for(let j=1; j<cellsLength; j++){
                headers[0] = i
                headers[j] = table.rows[i].cells[j].children[0].value
            }
            data.push(headers)
        }
        return data
    }

    tableArray = tableToArray(document.querySelector('.table'))

    // console.log(tableArray)
}

/////////////////////////// Function to convert Table to array ends here//////////////////////////
let saveAndContinueBtn = document.querySelector('.save-and-continue-con a')
window.onload = function(){
    addRow()
    getRequiredFields()
    let templateURL = sessionStorage.getItem('templateURL')
    saveAndContinueBtn.href = templateURL
}

function getRequiredFields(){
    let arrOfRequiredFields = document.querySelector('.invoice-form').querySelectorAll('[required]')

    if(arrOfRequiredFields[0].value != "" && arrOfRequiredFields[1].value != "" &&
    arrOfRequiredFields[2].value != "" && arrOfRequiredFields[3].value != "" &&
    arrOfRequiredFields[4].value != "" && arrOfRequiredFields[5].value != "" &&
    arrOfRequiredFields[6].value != ""
    ){
        document.getElementById('save-btn').classList.remove('disabled')
    }else{
        document.getElementById('save-btn').classList.add('disabled')
    }
}


function storeDataInSessionStorage(){
    // const actualInvoiceText_serialize = JSON.stringify(actualInvoiceText)
    const invoiceDetailsObject_serialize = JSON.stringify(invoiceDetailsObject)
    const invoiceMoreDetailsObject_serialize = JSON.stringify(invoiceMoreDetailsObject)
    const logoImageUrl_serialize = JSON.stringify(logoImageUrl)
    const fromDetailsObject_serialize = JSON.stringify(fromDetailsObject)
    const toDetailsObject_serialize = JSON.stringify(toDetailsObject)
    const totalTaxObject_serialize = JSON.stringify(totalTaxObject)
    const bankDetailsObject_serialize = JSON.stringify(bankDetailsObject)
    const termsAndConditionsObject_serialize = JSON.stringify(termsAndConditionsObject)
    const additionalNotesObject_serialize = JSON.stringify(additionalNotesObject)

    const tableArray_serialize = JSON.stringify(tableArray)

    localStorage.setItem('actualInvoiceText',actualInvoiceText)
    localStorage.setItem('invoiceDetailsObject',invoiceDetailsObject_serialize)
    localStorage.setItem('invoiceMoreDetailsObject',invoiceMoreDetailsObject_serialize)
    localStorage.setItem('logoImageUrl',logoImageUrl_serialize)
    localStorage.setItem('fromDetailsObject',fromDetailsObject_serialize)
    localStorage.setItem('toDetailsObject',toDetailsObject_serialize)
    localStorage.setItem('totalTaxObject',totalTaxObject_serialize)
    localStorage.setItem('bankDetailsObject',bankDetailsObject_serialize)
    localStorage.setItem('termsAndConditionsObject',termsAndConditionsObject_serialize)
    localStorage.setItem('additionalNotesObject',additionalNotesObject_serialize)

    localStorage.setItem('tableArray',tableArray_serialize)

    // const tableJson_deSerialize = JSON.parse(localStorage.getItem('tableJson'))
    // console.log(tableJson_deSerialize)

}