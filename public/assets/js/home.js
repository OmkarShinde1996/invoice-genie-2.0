

// Table logic-------------------------------------------------------------------------------------------
let tableRows = []
let tableCols = []
let counter = 0
let taxCounter = 0
let counterToDeleteColRow = 0
let normalCounter = 1
let colCount = 1
let itemNo = 1
let colsLength = document.querySelector('.column-header').cells.length
let definedRowCells = [
    `<div>${itemNo}</div>`,
    `<input type="text" id="item" placeholder="Item name (Required)" style="width: 250px;" oninput="getRequiredFields()" required>`,
    `<input type="number" id="quantity" placeholder="0" value="0" onkeyup="allInOne()" required>`,
    `<input type="number" id="rate" placeholder="0" value="0" onkeyup="allInOne()" required>`,
    `<input type="number" id="amount" placeholder="0" value="0" readonly>`,
]

//calculateAmount(),calculateSubTotal(),taxDiv()

function allInOne(){
    calculateAmount()
    calculateSubTotal()
    taxDiv()
    getRequiredFields()
}


function addRow() {
    // itemNo++
    definedRowCells[0] = `<div>${itemNo}</div>`
    var table = document.querySelector(".table-row");
    var row = table.insertRow();
    // console.log({normalCounter})
    addCellInRowFromRow(row) //insert cells in row
    tableRows.push(row)
    if(document.querySelector('.table').rows.length == 1){
        document.getElementById('notification-con').classList.remove('d-none')
    }else{
        document.getElementById('notification-con').classList.add('d-none')
    }
}
  
function deleteRow() {
    if(itemNo==1){
        return
    }
    document.querySelector(".table-row").deleteRow(itemNo-2);
    tableRows.pop()
    itemNo--
    // console.log(itemNo)
    if(document.querySelector('.table').rows.length == 1){
        document.getElementById('notification-con').classList.remove('d-none')
    }else{
        document.getElementById('notification-con').classList.add('d-none')
    }
}

//**************************Code to insert column at the end****************************/
// function addCol(){
//     counter++
//     let header = document.querySelector(".column-header")
//     let html = `<th contenteditable="true" class="text-start" scope="col" id="${counter}">Click to edit</th>`
//     header.innerHTML += html
//     tableCols.push(html)
//     colsLength++
//     definedRowCells.push(`<input type="text" value="" id="enter-text" placeholder="Enter text">`)
//     for(let i=0; i<tableRows.length; i++){
//         addCellinRowFromCol(tableRows[i])
//     }
// }

function addCol(){
    counter++
    let header = document.querySelector(".column-header")
    let itemHeader = header.querySelector('#items-head')
    let th = document.createElement('th')
    th.setAttribute('contenteditable','true')
    th.setAttribute('class','text-start')
    th.setAttribute('scope','col')
    th.setAttribute('id',`${counter}`)
    th.innerText = 'Click to edit'
    itemHeader.after(th)
    tableCols.unshift(th)
    colsLength++
    // definedRowCells.push(`<input type="text" value="" id="enter-text" placeholder="Enter text">`)//code for inserting element at last in array
    definedRowCells.splice(2,0,`<input type="text" value="" id="enter-text" placeholder="Enter text">`)//line rewrited to insert element at 2nd position in array
    // console.log(definedRowCells)
    for(let i=0; i<tableRows.length; i++){
        addCellinRowFromCol(tableRows[i])
    }
}

function deleteCol(){
    if(counter == 0){
        return
    }
    tableCols.pop()
    let header = document.getElementById(`${counter}`)
    header.remove()
    counter--
    colsLength--
    definedRowCells.splice(2,1)//line written to delete 2nd positioned element from array here the syntax is splice(startIndex, deleteCount)
    for(let i=0; i<tableRows.length; i++){
        deleteCellInRowFromCol(tableRows[i])
    }
}

let selectedTaxIndex

function createTaxCol(){
    let selectedTax = document.getElementById('set-tax')
    let selectedValue = selectedTax.selectedIndex
    // console.log({selectedValue})
    
        if(selectedValue == 0){
            deleteTaxColumn()
            deleteTaxDiv()
        }else{
            if(selectedValue == 0){ //selected "set tax" option
                selectedTaxIndex = 0
                deleteTaxColumn()
                deleteTaxDiv()
            }else if(selectedValue == 1){ //selected "GST" option
                deleteTaxColumn()
                selectedTaxIndex = 1
                addTaxColumn('GST')
                showTaxDiv('GST')
            }else if(selectedValue == 2){ //selected "VAT" option
                deleteTaxColumn()
                selectedTaxIndex = 2
                addTaxColumn('VAT')
                showTaxDiv('VAT')
            }else if(selectedValue == 3){ //selected "PPN" option
                deleteTaxColumn()
                selectedTaxIndex = 3
                addTaxColumn('PPN')
                showTaxDiv('PPN')
            }else if(selectedValue == 4){ //selected "SST" option
                deleteTaxColumn()
                selectedTaxIndex = 4
                addTaxColumn('SST')
                showTaxDiv('SST')
            }else if(selectedValue == 5){ //selected "HST" option
                deleteTaxColumn()
                selectedTaxIndex = 5
                addTaxColumn('HST')
                showTaxDiv('HST')
            }else if(selectedValue == 6){ //selected "TAX" option
                deleteTaxColumn()
                selectedTaxIndex = 6
                addTaxColumn('TAX')
                showTaxDiv('TAX')
            }
        }
    
}


function addTaxColumn(taxValue){
    taxCounter++
    let header = document.querySelector(".column-header")
    let quantityHeader = header.querySelector('#quantity-head')
    let th = document.createElement('th')
    th.setAttribute('class',`text-start selected-${taxValue}`)
    th.setAttribute('scope','col')
    th.setAttribute('id',`tax-${taxCounter}`)
    th.innerText = `${taxValue}(%)`
    quantityHeader.before(th)
    tableCols.push(th)
    colsLength++
    // definedRowCells.push(`<input type="text" value="" id="enter-text" placeholder="Enter text">`)//code for inserting element at last in array
    definedRowCells.splice(definedRowCells.length-3,0,`<input type="number" value="0" id="enter-tax-rate" onkeyup="allInOne()">`)//line rewrited to insert element at 2nd position in array
    // console.log(definedRowCells)
    for(let i=0; i<tableRows.length; i++){
        addCellinRowFromTaxCol(tableRows[i])
    }
}


function deleteTaxColumn(){
    if(taxCounter == 0){
        return
    }
    tableCols.pop()
    let header = document.getElementById(`tax-${taxCounter}`)
    header.remove()
    taxCounter--
    colsLength--
    // console.log(definedRowCells)
    definedRowCells.splice((definedRowCells.length-4),1)
    // console.log('after deleting',definedRowCells)
    // console.log(definedRowCells)
    for(let i=0; i<tableRows.length; i++){
        deleteCellinRowFromTaxCol(tableRows[i])
    }
}


function totalColRow(){
    console.log(tableRows.length)
    console.log(document.querySelector('.column-header').cells.length)
}


function addCellInRowFromRow(rowId){
    itemNo++
    // console.log('before',itemNo)
    for(let j=0; j<colsLength;j++){
        rowId.insertCell(j).innerHTML = definedRowCells[j]
    }
    normalCounter++
}

//**************************Code to Add cell at the end****************************/
// function addCellinRowFromCol(rowId){
//     rowId.insertCell(colsLength-1).innerHTML = '<input type="text" value="" id="enter-text" placeholder="Enter text">'
// }

function addCellinRowFromTaxCol(rowId){
    if(selectedTaxIndex != 0){
        rowId.insertCell(definedRowCells.length-4).innerHTML = `<input type="number" value="0" id="entered-tax-rate" onkeyup="allInOne()">`
        colCount++
    }
}

function addCellinRowFromCol(rowId){
    rowId.insertCell(2).innerHTML = `<input type="text" value="" id="enter-text" placeholder="Enter text">`
    colCount++
}

//**************************Code to delete cell from the end****************************/
// function deleteCellInRowFromCol(rowId){
//     rowId.deleteCell(colsLength)
// }

function deleteCellinRowFromTaxCol(rowId){
    rowId.deleteCell(definedRowCells.length-3)
}

function deleteCellInRowFromCol(rowId){
    rowId.deleteCell(2)
}

// Table logic ends here----------------------------------------------------------------------------------

function currentDate(){
    let date = document.getElementById('invoice-date-value')
    date.value = new Date().toISOString().slice(0, 10);
}

// Template show hide fields buttons----------------------------------------------------------------------

let addDueDateDiv = document.querySelector('#due-date-div')

function showDueDateField(){
    if(addDueDateDiv.classList.contains('d-none')){
        addDueDateDiv.classList.remove('d-none')
        document.querySelector('#add-due-date-btn').innerHTML = `<div class="invoice-date invoice-info-det-btn" onclick="showDueDateField()"><i class="bi bi-dash-circle-fill me-2"></i><span>Remove Due Date</span></div>`
    }else{
        addDueDateDiv.classList.add('d-none')
        document.querySelector('#add-due-date-btn').innerHTML = `<div class="invoice-date invoice-info-det-btn" onclick="showDueDateField()"><i
        class="bi bi-plus-circle-fill pe-2"></i><span>Add Due Date</span></div>`
    }
}


let addMoreInfoFieldDiv = document.getElementById('invoice-info-details')
let infoFieldCounter = 0

function addNewInfoField(){
    infoFieldCounter++
    let mainDiv = document.createElement('div');
    mainDiv.setAttribute('class','invoice-info py-2')
    mainDiv.setAttribute('id',`added-info-${infoFieldCounter}`)
    mainDiv.innerHTML = 
    `<div contentEditable="true" class="invoice-number invoice-info-det" id="invoice-number">Title</div>
    <div class="invoice-number-input"><input type="text" value="Text" id="invoice-number-value"></div>`
    addMoreInfoFieldDiv.appendChild(mainDiv)
    document.querySelector('#remove-info-field').classList.remove('d-none')
    // console.log(infoFieldCounter)
}

function removeLastInfoField(){
    infoFieldCounter--
    // console.log(infoFieldCounter)
    if(infoFieldCounter==0){
        addMoreInfoFieldDiv.removeChild(addMoreInfoFieldDiv.lastElementChild)
        document.querySelector('#remove-info-field').classList.add('d-none')
        return
    }else{
        addMoreInfoFieldDiv.removeChild(addMoreInfoFieldDiv.lastElementChild)
        // infoFieldCounter--
        // console.log(infoFieldCounter)
    }
    
}

// Template show hide fields buttons ends here------------------------------------------------------------

// From show hide fields buttons--------------------------------------------------------------------------

let addFromEmailBtn = document.querySelector('#from-email')
let addFromPhoneBtn = document.querySelector('#from-mobile')
let addFromGstBtn = document.querySelector('#from-gst')
let addFromPanBtn = document.querySelector('#from-pan')

function showFromEmailField(){
    if(addFromEmailBtn.classList.contains('d-none')){
        addFromEmailBtn.classList.remove('d-none')
        document.querySelector('#from-add-email').innerText = 'Remove Email Id'
    }else{
        addFromEmailBtn.classList.add('d-none')
        document.querySelector('#from-add-email').innerText = 'Add Email Id'
    }
}

function showFromPhoneField(){
    if(addFromPhoneBtn.classList.contains('d-none')){
        addFromPhoneBtn.classList.remove('d-none')
        document.querySelector('#from-add-phone').innerText = 'Remove Phone Number'
    }else{
        addFromPhoneBtn.classList.add('d-none')
        document.querySelector('#from-add-phone').innerText = 'Add Phone Number'
    }
}

function showFromGstField(){
    if(addFromGstBtn.classList.contains('d-none')){
        addFromGstBtn.classList.remove('d-none')
        document.querySelector('#from-add-gst').innerText = 'Remove GST No.'
    }else{
        addFromGstBtn.classList.add('d-none')
        document.querySelector('#from-add-gst').innerText = 'Add GST No.'
    }
}

function showFromPanField(){
    if(addFromPanBtn.classList.contains('d-none')){
        addFromPanBtn.classList.remove('d-none')
        document.querySelector('#from-add-pan').innerText = 'Remove PAN No.'
    }else{
        addFromPanBtn.classList.add('d-none')
        document.querySelector('#from-add-pan').innerText = 'Add PAN No.'
    }
}


// From show hide fields buttons ends here----------------------------------------------------------------

// To show hide fields buttons--------------------------------------------------------------------------

let addToEmailBtn = document.querySelector('#to-email')
let addToPhoneBtn = document.querySelector('#to-mobile')
let addToGstBtn = document.querySelector('#to-gst')
let addToPanBtn = document.querySelector('#to-pan')

function showToEmailField(){
    if(addToEmailBtn.classList.contains('d-none')){
        addToEmailBtn.classList.remove('d-none')
        document.querySelector('#to-add-email').innerText = 'Remove Email Id'
    }else{
        addToEmailBtn.classList.add('d-none')
        document.querySelector('#to-add-email').innerText = 'Add Email Id'
    }
}

function showToPhoneField(){
    if(addToPhoneBtn.classList.contains('d-none')){
        addToPhoneBtn.classList.remove('d-none')
        document.querySelector('#to-add-phone').innerText = 'Remove Phone Number'
    }else{
        addToPhoneBtn.classList.add('d-none')
        document.querySelector('#to-add-phone').innerText = 'Add Phone Number'
    }
}

function showToGstField(){
    if(addToGstBtn.classList.contains('d-none')){
        addToGstBtn.classList.remove('d-none')
        document.querySelector('#to-add-gst').innerText = 'Remove GST No.'
    }else{
        addToGstBtn.classList.add('d-none')
        document.querySelector('#to-add-gst').innerText = 'Add GST No.'
    }
}

function showToPanField(){
    if(addToPanBtn.classList.contains('d-none')){
        addToPanBtn.classList.remove('d-none')
        document.querySelector('#to-add-pan').innerText = 'Remove PAN No.'
    }else{
        addToPanBtn.classList.add('d-none')
        document.querySelector('#to-add-pan').innerText = 'Add PAN No.'
    }
}

// From show hide fields buttons ends here----------------------------------------------------------------

// invoice notes container fields buttons-----------------------------------------------------------------

let addBankDetailsDiv = document.querySelector('#bank-details-con')
let addTermsConditionsDiv = document.querySelector('#terms-con')
let addAdditionalNotesDiv = document.querySelector('#additional-notes-con')

function showBankDetails(){
    if(addBankDetailsDiv.classList.contains('d-none')){
        addBankDetailsDiv.classList.remove('d-none')
        document.querySelector('#add-bank-details').innerHTML = `<i class="bi bi-dash-circle-fill me-2"></i><span>Remove Bank Details</span>`
    }else{
        addBankDetailsDiv.classList.add('d-none')
        document.querySelector('#add-bank-details').innerHTML = `<i class="bi bi-plus-circle-fill pe-2"></i><span>Add Bank Details</span>`
    }
}

function showTermsConditions(){
    if(addTermsConditionsDiv.classList.contains('d-none')){
        addTermsConditionsDiv.classList.remove('d-none')
        document.querySelector('#add-terms-conditions').innerHTML = `<i class="bi bi-dash-circle-fill me-2"></i><span>Remove Terms & Conditions</span>`
    }else{
        addTermsConditionsDiv.classList.add('d-none')
        document.querySelector('#add-terms-conditions').innerHTML = `<i class="bi bi-plus-circle-fill pe-2"></i><span>Add Terms & Conditions</span>`
    }
}

function showAdditionalNotes(){
    if(addAdditionalNotesDiv.classList.contains('d-none')){
        addAdditionalNotesDiv.classList.remove('d-none')
        document.querySelector('#add-additional-notes').innerHTML = `<i class="bi bi-dash-circle-fill me-2"></i><span>Remove Additional Notes</span>`
    }else{
        addAdditionalNotesDiv.classList.add('d-none')
        document.querySelector('#add-additional-notes').innerHTML = `<i class="bi bi-plus-circle-fill pe-2"></i><span>Add Additional Notes</span>`
    }
}

// invoice notes container fields buttons ends here-------------------------------------------------------

// Give Discount Button-----------------------------------------------------------------------------------

let giveDiscountDiv = document.querySelector('#discount-con')

function showDiscountDiv(){
    if(giveDiscountDiv.classList.contains('d-none')){
        giveDiscountDiv.classList.remove('d-none')
        document.querySelector('#discount-on-total').innerHTML = `<i class="bi bi-dash-circle-fill me-2"></i><span>Remove Discount</span>`
    }else{
        document.querySelector('#discount-amount').value = 0 //This line will set default discount amount to 0 when user clickes on remove discount button
        // console.log(document.querySelector('#discount-amount').value)
        calculateSubTotal() //After setting discount amount we need to again calculate subtotal and total
        giveDiscountDiv.classList.add('d-none')
        document.querySelector('#discount-on-total').innerHTML = `<i class="bi bi-plus-circle-fill pe-2"></i><span>Give Discount</span>`
    }
}

// Give Discount Button ends here-------------------------------------------------------------------------

function taxAllinOne(){
    createTaxCol()
    calculateAmount()
    calculateSubTotal()
    // makeTotalTaxObject()
}

function addDeleteButtons(){
    deleteRow()
    calculateSubTotal()
    deleteRowTaxCalculate()
}