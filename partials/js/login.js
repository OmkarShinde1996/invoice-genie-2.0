if(document.getElementById('form1') != null){
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
        }
    })
})
}