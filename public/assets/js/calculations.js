//*******************************************************************************************************/
//                                         Getting calculations done
//*******************************************************************************************************/


//Calculation subTotal------------------------------------------------------------------------------------

function calculateAmount(){
    let tableBody = document.querySelector('.table-row').children
    let totalAmountDiv
    let totalAmount = 0
    let tax = 0
    let quantity = 0
    let rate = 0
    let totalAmountWithTax = 0
    for(let i=0; i<tableBody.length; i++){
        totalAmountDiv = tableBody[i].cells[tableBody[i].cells.length-1].children[0]
        if(tableBody[i].cells[tableBody[i].cells.length-4].children[0].type == "number"){
            tax = Number(tableBody[i].cells[tableBody[i].cells.length-4].children[0].value) //This will give the tax rate value
        }else{
            tax = 0
        }
        quantity = Number(tableBody[i].cells[tableBody[i].cells.length-3].children[0].value) //This will get quantity value
        rate = Number(tableBody[i].cells[tableBody[i].cells.length-2].children[0].value) //This will get rate value
        totalAmount = quantity*rate
        // console.log({tax})
        // console.log({totalAmount})
        totalAmountWithTax = (totalAmount+((totalAmount*tax)/100)).toFixed(2)
        // console.log({totalAmountWithTax})
        totalAmountDiv.value = totalAmountWithTax
    }

    
}
//=========================================================================================



//=========================================================================================

function calculateSubTotal(){
    let tableBody = document.querySelector('.table-row').children
    let subTotalDiv = document.querySelector('#sub-total-amount')
    let subTotal = 0
    for(let i=0; i<tableBody.length; i++){
        subTotal += Number(tableBody[i].cells[tableBody[i].cells.length-1].children[0].value)
    }
    subTotalDiv.innerText = subTotal.toFixed(2)

    let TotalAmountTillDiv = document.querySelector('#total-amount')
    let discountAmount = document.querySelector('#discount-amount').value
    let totalAmountTillNow = subTotal - discountAmount
    TotalAmountTillDiv.innerText = totalAmountTillNow.toFixed(2)

    
}

//=========================================================================================



//=========================================================================================
let subTotalTaxAmount = 0
let totalTaxAmount = 0

function taxDiv(){
    if(selectedTaxIndex == 1){
        calculateTotalTaxAmount('GST')
    }else if(selectedTaxIndex == 2){
        calculateTotalTaxAmount('VAT')
    }else if(selectedTaxIndex == 3){
        calculateTotalTaxAmount('PPN')
    }else if(selectedTaxIndex == 4){
        calculateTotalTaxAmount('SST')
    }else if(selectedTaxIndex == 5){
        calculateTotalTaxAmount('HST')
    }else if(selectedTaxIndex == 6){
        calculateTotalTaxAmount('TAX')
    }
}


function showTaxDiv(taxName){
    let taxDiv = document.querySelector('.total-tax-container')
    if(taxDiv.childElementCount != 0){
        deleteTaxDiv()
    }

    let taxHeader = document.createElement('div')
    taxHeader.setAttribute('class',`${taxName}-total-text`)
    taxHeader.setAttribute('id',`${taxName}-tax-added`)

    let taxH = document.createElement('h3')
    taxH.setAttribute('id',`${taxName}-header`)
    taxH.setAttribute('class','tax-headline')
    taxH.innerText = `Total ${taxName}`

    taxHeader.appendChild(taxH)


    let taxHeader2 = document.createElement('div')
    taxHeader2.setAttribute('class',`${taxName}-total-amount`)
    taxHeader2.setAttribute('id',`${taxName}-tax-amount-added`)

    let taxH2 = document.createElement('span')
    taxH2.setAttribute('calss',`h4`)
    taxH2.innerHTML = '&#8377;'

    let spanEle = document.createElement('span')
    spanEle.setAttribute('id',`${taxName}-total-amount`)// tax-total-amount-cal
    spanEle.setAttribute('class','tax-total-amount-cal')
    spanEle.innerText = totalTaxAmount

    taxH2.appendChild(spanEle)
    taxHeader2.appendChild(taxH2)

    taxDiv.appendChild(taxHeader)
    taxDiv.appendChild(taxHeader2)

    calculateTotalTaxAmount(taxName)    
}
let taxArr = []
function deleteTaxDiv(){
    let taxDiv = document.querySelector('.total-tax-container')
    taxDiv.firstElementChild.remove()
    taxDiv.lastElementChild.remove()
    taxArr = []
}

function deleteRowTaxCalculate(){
    taxArr.pop()
    taxDiv()
}


function calculateTotalTaxAmount(taxName){
    if(document.querySelector('.total-tax-container').childElementCount != 0){
        let div = document.querySelector(`#${taxName}-total-amount`)
        let tableBody = document.querySelector('.table-row').children

        for(let i=0; i<tableBody.length; i++){
            let taxVal = Number(tableBody[i].cells[tableBody[i].cells.length-4].children[0].value)
            let quantity1 = Number(tableBody[i].cells[tableBody[i].cells.length-3].children[0].value) //This will get quantity value
            let rate1 = Number(tableBody[i].cells[tableBody[i].cells.length-2].children[0].value) //This will get rate value
        
            subTotalTaxAmount = Number(((quantity1*rate1)*taxVal)/100)
            taxArr[i] = subTotalTaxAmount
        }
    
        const sum = taxArr.reduce((partialSum, a) => partialSum + a, 0);
        div.innerText = sum.toFixed(2)
    }else{
        return
    }
}

//Calculating subtotal ends here--------------------------------------------------------------------------

