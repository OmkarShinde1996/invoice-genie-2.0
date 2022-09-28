


let template1 = document.getElementById('template1')
let template2 = document.getElementById('template2')
let template3 = document.getElementById('template3')
let template4 = document.getElementById('template4')
let template5 = document.getElementById('template5')
let template6 = document.getElementById('template6')

template1.addEventListener('click',() => {
    sessionStorage.setItem('templateURL','./printReady.html')
})

template2.addEventListener('click',() => {
    sessionStorage.setItem('templateURL','./template-2.html')
})

template3.addEventListener('click',() => {
    sessionStorage.setItem('templateURL','./template-3.html')
})

template4.addEventListener('click',() => {
    sessionStorage.setItem('templateURL','./template-4.html')
})

template5.addEventListener('click',() => {
    sessionStorage.setItem('templateURL','./template-5.html')
})

template6.addEventListener('click',() => {
    sessionStorage.setItem('templateURL','./template-6.html')
})