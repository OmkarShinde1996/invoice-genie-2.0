let fillInvoiceTitle = document.getElementById('Invoice-title')
let fillLogoContainer = document.querySelector('.invoice-logo-img')
let fillLogoImg = document.getElementById('invoice-logo')
let fillInvoiceNo = document.getElementById('invoice-number')
let fillInvoiceDate = document.getElementById('invoice-date')
let fillInvoiceDueDateCon = document.getElementById('due-date-con')
let fillInvoiceDueDate = document.getElementById('due-date')
let fillInvoiceFromText = document.querySelector('#from-text')
let fillInvoiceFromName = document.querySelector('#from-name strong')
let fillInvoiceFromAdd = document.getElementById('from-add')
let fillInvoiceToText = document.querySelector('#to-text')
let fillInvoiceToName = document.querySelector('#to-name strong')
let fillInvoiceToAdd = document.getElementById('to-add')
let fillMoreDetailsContainer = document.getElementById('more-details-con')
let fillAdditionalNotesCon = document.querySelector('.additional-notes-con')
let fillAdditionalNotes = document.querySelector('.notes')
let fillTotalTaxVisible = document.getElementById('total-tax')
let fillTotalTAX = document.getElementById('total-tax-amt') //Add Rupee symbol
let fillSubTotalAmt = document.getElementById('sub-total-amt') //Add Rupee symbol
let fillDiscountAmtVisible = document.getElementById('total-discout')
let fillDiscountAmt = document.getElementById('total-discount-amt') //Add Rupee symbol
let fillTotalDueText = document.getElementById('total-text')
let fillTotalDueAmt = document.getElementById('total-due-amt') //Add Rupee symbol
let termsBankCon = document.querySelector('.invoice-footer-container')
let fillTermsCoditionsCon = document.getElementById('terms-conditions-con')
let fillTermsAndConditions = document.querySelector('.terms')
let fillAccHolderName = document.getElementById('acc-holder-name')
let fillAccNumber = document.getElementById('acc-number')
let fillBankIFSC = document.getElementById('bank-ifsc')
let fillAccType = document.getElementById('acc-type')
let fillBankName = document.getElementById('bank-name')
let fillUpiId = document.getElementById('upi-id')


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
            fillInvoice()
        }
    })
}
getDataFromDB()

function fillInvoice(){

    let amountInDecimal = totalTaxObject_deSerialize.Total.split('; ')
    let amountArray = amountInDecimal[1].split('.')
    let actualAmount = Number(amountArray[0])
    numberToWord(actualAmount)
    //Setting up the Invoice text
    fillInvoiceTitle.innerText = actualInvoiceText_deSerialize
    //Setting up the logo url, if not present then hiding logo container
    if(Object.keys(logoImageUrl_deSerialize).length == 0){
        fillLogoContainer.classList.add('d-none')
    }else{
        fillLogoImg.src = logoImageUrl_deSerialize.logoUrl
    }

    //Setting up the Invoice details values
    fillInvoiceNo.innerText = invoiceDetailsObject_deSerialize["Invoice No."]
    fillInvoiceDate.innerText = invoiceDetailsObject_deSerialize["Invoice Date"]
    if(invoiceDetailsObject_deSerialize["Due Date"] != undefined){
        fillInvoiceDueDateCon.classList.remove('d-none')
        fillInvoiceDueDate.innerText = invoiceDetailsObject_deSerialize["Due Date"]
    }else{
        fillInvoiceDueDateCon.classList.add('d-none')
    }

    //Setting up the from details values
    fillInvoiceFromText.innerText = fromDetailsObject_deSerialize["fromTitle"]
    fillInvoiceFromName.innerText = fromDetailsObject_deSerialize["fromName"]
    let actualFromAddress1 = ""
    let actualFromCity1 = ""
    let actualFromState1 = ""
    let actualFromCountry1 = ""
    let actualFromZip1 = ""
    let actualFromPhone1 = ""
    let actualFromEmail1 = ""
    let actualFromGST1 = ""
    let actualFromPAN1 = ""
    if(fromDetailsObject_deSerialize["fromAddress"] != undefined && fromDetailsObject_deSerialize["fromAddress"] != ""){
        let fromAddress1 = fromDetailsObject_deSerialize["fromAddress"]
        actualFromAddress1 = `${fromAddress1},`
    }
    if(fromDetailsObject_deSerialize["fromCity"] != undefined && fromDetailsObject_deSerialize["fromCity"] != ""){
        let fromCity1 = fromDetailsObject_deSerialize["fromCity"]
        actualFromCity1 = `${fromCity1},`
    }
    if(fromDetailsObject_deSerialize["fromState"] != undefined && fromDetailsObject_deSerialize["fromState"] != ""){
        let fromState1 = fromDetailsObject_deSerialize["fromState"]
        actualFromState1 = `${fromState1},`
    }
    if(fromDetailsObject_deSerialize["fromCountry"] != undefined && fromDetailsObject_deSerialize["fromCountry"] != ""){
        let fromCountry1 = fromDetailsObject_deSerialize["fromCountry"]
        actualFromCountry1 = `${fromCountry1} - `
    }
    if(fromDetailsObject_deSerialize["fromZip"] != undefined){
        let fromZip1 = fromDetailsObject_deSerialize["fromZip"]
        actualFromZip1 = `${fromZip1}`
    }
    if(fromDetailsObject_deSerialize["fromPhone"] != undefined){
        let fromPhone1 = fromDetailsObject_deSerialize["fromPhone"]
        actualFromPhone1 = `${fromPhone1}`
    }
    if(fromDetailsObject_deSerialize["fromEmail"] != undefined){
        let fromEmail1 = fromDetailsObject_deSerialize["fromEmail"]
        actualFromEmail1 = `${fromEmail1}`
    }
    if(fromDetailsObject_deSerialize["fromGst"] != undefined){
        let fromGST1 = fromDetailsObject_deSerialize["fromGst"]
        actualFromGST1 = `${fromGST1}`
    }
    if(fromDetailsObject_deSerialize["fromPan"] != undefined){
        let fromPAN1 = fromDetailsObject_deSerialize["fromPan"]
        actualFromPAN1 = `${fromPAN1}`
    }
    fillInvoiceFromAdd.innerText = `${actualFromAddress1} ${actualFromCity1} ${actualFromState1} ${actualFromCountry1} ${actualFromZip1}`
    if(actualFromPhone1 != ""){
        fillInvoiceFromAdd.innerHTML += `<p>Phone - <small>${actualFromPhone1}</small></p>`
    }
    if(actualFromEmail1 != ""){
        fillInvoiceFromAdd.innerHTML += `<p>Email - <small>${actualFromEmail1}</small></p>`
    }
    if(actualFromGST1 != ""){
        fillInvoiceFromAdd.innerHTML += `<p>GST No. - <small>${actualFromGST1}</small></p>`
    }
    if(actualFromPAN1 != ""){
        fillInvoiceFromAdd.innerHTML += `<p>PAN No. - <small>${actualFromPAN1}</small></p>`
    }


    //Setting up the to details values
    fillInvoiceToText.innerText = toDetailsObject_deSerialize["toTitle"]
    fillInvoiceToName.innerText = toDetailsObject_deSerialize["toName"]
    let actualToAddress1 = ""
    let actualToCity1 = ""
    let actualToState1 = ""
    let actualToCountry1 = ""
    let actualToZip1 = ""
    let actualToPhone1 = ""
    let actualToEmail1 = ""
    let actualToGST1 = ""
    let actualToPAN1 = ""
    if(toDetailsObject_deSerialize["toAddress"] != undefined && toDetailsObject_deSerialize["toAddress"] != ""){
        let toAddress1 = toDetailsObject_deSerialize["toAddress"]
        actualToAddress1 = `${toAddress1},`
    }
    if(toDetailsObject_deSerialize["toCity"] != undefined && toDetailsObject_deSerialize["toCity"] != ""){
        let toCity1 = toDetailsObject_deSerialize["toCity"]
        actualToCity1 = `${toCity1},`
    }
    if(toDetailsObject_deSerialize["toState"] != undefined && toDetailsObject_deSerialize["toState"] != ""){
        let toState1 = toDetailsObject_deSerialize["toState"]
        actualToState1 = `${toState1},`
    }
    if(toDetailsObject_deSerialize["toCountry"] != undefined && toDetailsObject_deSerialize["toCountry"] != ""){
        let toCountry1 = toDetailsObject_deSerialize["toCountry"]
        actualToCountry1 = `${toCountry1} - `
    }
    if(toDetailsObject_deSerialize["toZip"] != undefined){
        let toZip1 = toDetailsObject_deSerialize["toZip"]
        actualToZip1 = `${toZip1}`
    }
    if(toDetailsObject_deSerialize["toPhone"] != undefined){
        let toPhone1 = toDetailsObject_deSerialize["toPhone"]
        actualToPhone1 = `${toPhone1}`
    }
    if(toDetailsObject_deSerialize["toEmail"] != undefined){
        let toEmail1 = toDetailsObject_deSerialize["toEmail"]
        actualToEmail1 = `${toEmail1}`
    }
    if(toDetailsObject_deSerialize["toGst"] != undefined){
        let toGST1 = toDetailsObject_deSerialize["toGst"]
        actualToGST1 = `${toGST1}`
    }
    if(toDetailsObject_deSerialize["toPan"] != undefined){
        let toPAN1 = toDetailsObject_deSerialize["toPan"]
        actualToPAN1 = `${toPAN1}`
    }
    fillInvoiceToAdd.innerText = `${actualToAddress1} ${actualToCity1} ${actualToState1} ${actualToCountry1} ${actualToZip1}`
    if(actualToPhone1 != ""){
        fillInvoiceToAdd.innerHTML += `<p>Phone - <small>${actualToPhone1}</small></p>`
    }
    if(actualToEmail1 != ""){
        fillInvoiceToAdd.innerHTML += `<p>Email - <small>${actualToEmail1}</small></p>`
    }
    if(actualToGST1 != ""){
        fillInvoiceToAdd.innerHTML += `<p>GST No. - <small>${actualToGST1}</small></p>`
    }
    if(actualToPAN1 != ""){
        fillInvoiceToAdd.innerHTML += `<p>PAN No. - <small>${actualToPAN1}</small></p>`
    }
    
    //Setting up the more fields values if any
    if(invoiceMoreDetailsObject_deSerialize != undefined){
        let length = Object.keys(invoiceMoreDetailsObject_deSerialize).length
        for(let i=0; i<length; i++){
            let fieldTitle = Object.keys(invoiceMoreDetailsObject_deSerialize)[i]
            let fieldTextValue = invoiceMoreDetailsObject_deSerialize[fieldTitle]
            let divCon = document.createElement('div')
            divCon.setAttribute('class','more-details-inside-container')
            let pTag = document.createElement('p')
            pTag.innerText = `${fieldTitle}`
            let smallTag = document.createElement('small')
            smallTag.innerText = `${fieldTextValue}`
            divCon.appendChild(pTag)
            divCon.appendChild(smallTag)
            fillMoreDetailsContainer.appendChild(divCon)
        }
    }

    //Setting Up the Additional Notes value
    if(Object.keys(additionalNotesObject_deSerialize).length != 0){
        fillAdditionalNotesCon.classList.remove('d-none')
        fillAdditionalNotes.classList.remove('d-none')
        fillAdditionalNotes.innerText = additionalNotesObject_deSerialize["Additional Notes"]
    }else{
        fillAdditionalNotesCon.classList.add('d-none')
        fillAdditionalNotes.classList.remove('d-none')
    }

    //Setting up the total amounts values 
    if(totalTaxObject_deSerialize["Total Deductions(Taxes)"] != "0" && totalTaxObject_deSerialize["Total Deductions(Taxes)"] != undefined){
        fillTotalTaxVisible.classList.remove('d-none')
        fillTotalTAX.innerHTML = totalTaxObject_deSerialize["Total Deductions(Taxes)"]
    }else{
        fillTotalTaxVisible.classList.add('d-none')
    }
    fillSubTotalAmt.innerHTML = totalTaxObject_deSerialize["subTotal"]
    if(totalTaxObject_deSerialize["Discount(₹)"] != "0" && totalTaxObject_deSerialize["Discount(₹)"] != "-&#8377; 0"){
        fillDiscountAmtVisible.classList.remove('d-none')
        fillDiscountAmt.innerHTML = totalTaxObject_deSerialize["Discount(₹)"]
    }else{
        fillDiscountAmtVisible.classList.add('d-none')
    }
    fillTotalDueAmt.innerHTML = totalTaxObject_deSerialize["Total"]

    //Setting up terms & conditions values
    if(Object.keys(termsAndConditionsObject_deSerialize).length != 0){
        fillTermsCoditionsCon.classList.remove('d-none')
        fillTermsAndConditions.innerText = termsAndConditionsObject_deSerialize["Terms & Conditions"]
    }

    //Setting up Bank details values
    if(Object.keys(bankDetailsObject_deSerialize).length != 0){
        document.getElementById('bank-details-con').classList.remove('d-none')
        if(bankDetailsObject_deSerialize["Account Holder Name"] != undefined){
            document.getElementById('accHolderName').classList.remove('d-none')
            fillAccHolderName.innerText = bankDetailsObject_deSerialize["Account Holder Name"]
        }else{
            document.getElementById('accHolderName').classList.add('d-none')
        }
        if(bankDetailsObject_deSerialize["Account Number"] != undefined){
            document.getElementById('accNumber').classList.remove('d-none')
            fillAccNumber.innerText = bankDetailsObject_deSerialize["Account Number"]
        }else{
            document.getElementById('accNumber').classList.add('d-none')
        }
        if(bankDetailsObject_deSerialize["Bank IFSC"] != undefined){
            document.getElementById('bankIFSC').classList.remove('d-none')
            fillBankIFSC.innerText = bankDetailsObject_deSerialize["Bank IFSC"]
        }else{
            document.getElementById('bankIFSC').classList.add('d-none')
        }
        if(bankDetailsObject_deSerialize["Account Type"] != undefined){
            document.getElementById('accType').classList.remove('d-none')
            fillAccType.innerText = bankDetailsObject_deSerialize["Account Type"]
        }else{
            document.getElementById('accType').classList.add('d-none')
        }
        if(bankDetailsObject_deSerialize["Bank Name"] != undefined){
            document.getElementById('bankName').classList.remove('d-none')
            fillBankName.innerText = bankDetailsObject_deSerialize["Bank Name"]
        }else{
            document.getElementById('bankName').classList.add('d-none')
        }
        if(bankDetailsObject_deSerialize["UPI ID"] != undefined){
            document.getElementById('upiID').classList.remove('d-none')
            fillUpiId.innerText = bankDetailsObject_deSerialize["UPI ID"]
        }else{
            document.getElementById('upiID').classList.add('d-none')
        }
        
    }else{
        document.getElementById('bank-details-con').classList.add('d-none')
    }

    //Creating table tableArray_deSerialize
    let tableHeaders = document.getElementById('thead')
    let tableBody = document.getElementById('tbody')
    // console.log(tableArray_deSerialize[1][1])
    //Setting up the headers
    let columnsLength = tableArray_deSerialize[0].length
    for(let i=0; i<columnsLength; i++){
        let th = document.createElement('th')
        th.setAttribute('scope','col')
        if(tableArray_deSerialize[0][i] != "Item/Item Description"){
            th.setAttribute('class','text-center')
        }
        th.innerText = tableArray_deSerialize[0][i]
        tableHeaders.appendChild(th)
    }
    //Setting up the row cells
    let rowLength = tableArray_deSerialize.length
    for(let j=1; j<rowLength; j++){
        let tr = document.createElement('tr')
        tr.setAttribute('class','text-start')
        for(let x=0; x<tableArray_deSerialize[j].length; x++){
            let td = document.createElement('td')
            if(x != 1){
                td.setAttribute('class','text-center')
            }
            td.innerText = tableArray_deSerialize[j][x]
            tr.appendChild(td)
        }
        // console.log(tr)
        tableBody.appendChild(tr)
        
    }
}


