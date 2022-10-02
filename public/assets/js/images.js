

//**************************************Handeling Logo image***********************************/
const fileInput = document.querySelector('.file-input'),
uploadLogoBtn = document.querySelector('.logo-btn'),
perviewImage = document.querySelector('.invoice-logo img')


const loadImage = () => {
    let file = fileInput.files[0]//Getting user selected file
    if(!file) return //return if user does not select any file
    // image_url = URL.createObjectURL(file) //It will create a url of passed image file object
    let reader = new FileReader()
    reader.readAsDataURL(file)
    let dataurl
    reader.addEventListener('load',() => {
        perviewImage.src = reader.result
    })
}

fileInput.addEventListener('change', loadImage)
uploadLogoBtn.addEventListener('click', () => fileInput.click())