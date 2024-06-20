document.addEventListener('DOMContentLoaded', function() {

    const colors = document.querySelectorAll('.color');
    const uploadButton = document.querySelector('.upload-btn');
    const uploadInput = document.querySelector('.upload-input');
    const logoImg = document.querySelector('.logo-img');
    const loader = document.querySelector('.loader');
    const imgDiv = document.querySelector('.img-div');
    const uploadText = document.querySelector('.upload-text');
    const uploadLogo = document.querySelector('.upload-logo');
    const miniLoader = document.querySelector('.mini-loader')
    const cross = document.querySelector('.cross');
    var flag  = false

    colors.forEach(color => {
        color.addEventListener('click', function() {
            console.log("click")
            const selectedColor = this.getAttribute('color-name');
            const img = this.getAttribute('color-img');
            console.log(img);
            const buttonColor = color.style.backgroundColor;
            console.log(buttonColor);
            document.querySelector('.background').style.backgroundColor = selectedColor;
            document.querySelector('.upload-btn').style.backgroundColor = buttonColor;
            document.querySelector('.umbrella').src = `./public/${img}`;
        });
    });

    
    uploadButton.addEventListener('click', function() {
        if(flag)
            return;
        uploadInput.click();
    })

    cross.addEventListener('click', function(){
        logoImg.style.display = 'none';
        uploadText.textContent = 'UPLOAD LOGO';
        uploadInput.value = '';
        cross.style.display = 'none';
        setTimeout(function(){
            flag = false
        },1000)

        
    })

    uploadInput.addEventListener('change', function() {
        const file = uploadInput.files[0];
        if (file) {
            flag = true;
            imgDiv.style.display = 'none';
            uploadLogo.style.display = 'none';
            miniLoader.style.display = 'block';
            loader.style.display = 'flex';
            cross.style.display = 'block'

            const fileType = file.type;

            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)) {
                alert('Image file invalid (PNG, JPG, JPEG).');
                uploadInput.value = '';
                loader.style.display = 'none';
                imgDiv.style.display = 'block';
                uploadLogo.style.display = 'block';
                miniLoader.style.display = 'none';
                return;
            }

            const size = file.size;

            const maxSize = 5 * 1024 * 1024; 
            if (size > maxSize) {
                alert('File size exceeds 5MB.');
                logoInput.value = '';
                loader.style.display = 'none';
                imgDiv.style.display = 'block';
                uploadLogo.style.display = 'block';
                miniLoader.style.display = 'none';
                return;
            }
            
            const name = file.name.slice(0,7) + '.' + file.type.split('/')[1].toString();
            uploadText.textContent = name
            const reader = new FileReader();
            reader.onload = function(e) {
                logoImg.src = e.target.result;
                setTimeout(function() {
                    loader.style.display = 'none';
                    imgDiv.style.display = 'block';
                    logoImg.style.display = 'block';
                    uploadLogo.style.display = 'block';
                    miniLoader.style.display = 'none';
                }, 3000);
            };
            reader.readAsDataURL(file);
        }
    })
});