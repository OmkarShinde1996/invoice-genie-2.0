
form2.addEventListener('submit', () => {
    const register = {
        username:username.value,
        email: email1.value,
        password: password1.value
    }
    fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(register),
        headers:{
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(data => {
        if(data.status == 'error'){
            success1.style.display = 'none'
            error1.style.display = 'block'
            error1.innerText = data.error
        }else{
            error1.style.display = 'none'
            success1.style.display = 'block'
            success1.innerText = data.success
            location.reload()
        }
    })
})

close2.addEventListener('click', ()=>{
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