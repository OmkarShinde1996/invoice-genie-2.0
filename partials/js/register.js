
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
            success.style.display = 'none'
            error.style.display = 'block'
            error.innerText = data.error
        }else{
            error.style.display = 'none'
            success.style.display = 'block'
            success.innerText = data.success
        }
    })
})