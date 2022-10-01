
form1.addEventListener('submit', () => {
    const login = {
        email: email.value,
        password: password.value
    }
    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(login),
        headers:{
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(data => {
        if(data.status == 'error'){
            success.style.display = 'none'
            error.style.display = 'block'
            error.innerText = data.error
        }else{
            error.style.display = 'none'
            success.style.display = 'block'
            success.innerText = data.success
            location.reload()
        }
    })
})

close1.addEventListener('click', ()=>{
    if(success.style.display == 'block'){
        success.style.display = 'none'
        email.value = ''
        password.value = ''
    }else if(error.style.display == 'block'){
        error.style.display = 'none'
        email.value = ''
        password.value = ''
    }
    if(success1.style.display == 'block'){
        success1.style.display = 'none'
        username.value = ''
        email1.value = ''
        password1.value = ''
    }else if(error1.style.display == 'block'){
        error1.style.display = 'none'
        username.value = ''
        email1.value = ''
        password1.value = ''
    }
})