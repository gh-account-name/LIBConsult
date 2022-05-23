let form = document.querySelector('.form');
let formBlock = document.querySelector('.formBlock')
let closeButton = document.querySelector('.closeButton')
let hiddenInput = document.querySelector('.theme')
let buttons = document.querySelectorAll('p.button');
let subButton = document.querySelector('.form .formBlock form button:first-of-type');
let phoneInp = document.querySelector('#phoneNum');
let nameInp = document.querySelector('#name');
let bodyLoad = document.querySelector('body')

buttons.forEach(function(element, i){
    element.onclick = function(){
        subTriggerName = false;
        subTriggerPhone = false;
        form.style.display = 'flex';
        formBlock.classList.add('formBlockActive');
        if (i == 1){
            hiddenInput.value = 'Спецпредложение'
        }
        else if (i == 2){
            hiddenInput.value = 'Заявка на обучение'
        }
        else{
            hiddenInput.value = 'Связь с клиентом'
        }
    }
})

nameInp.oninput = function(){
    let expName = /^(([a-z]{2,}|[а-я]{2,})\s?){1,}$/i
    if (expName.test(nameInp.value)){
        subTriggerName = true;
        this.style.borderColor = 'var(--green)'
    } else {
        subTriggerName = false;
        this.style.borderColor = 'red';
    }
    if (subTriggerName && subTriggerPhone){
        subButton.classList.add('buttonActive')
    } else {
        subButton.classList.remove('buttonActive')
    }
}

phoneInp.oninput = function(){
    let expNumber = /^(\+\s?7|8)(\s?9\d{2}\s?|\s?\(9\d{2}\)\s?)(\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}\-\d{2}\-\d{2}|\d{3}\s\-\s\d{2}\s\-\s\d{2})$/
    if (expNumber.test(phoneInp.value)){
        subTriggerPhone = true;
        this.style.borderColor = 'var(--green)'
    } else {
        subTriggerPhone = false;
        this.style.borderColor = 'red';
    }
    if (subTriggerName && subTriggerPhone){
        subButton.classList.add('buttonActive')
    } else {
        subButton.classList.remove('buttonActive')
    }
}

subButton.addEventListener("click", async function(event) {
    if (!subTriggerName){
        nameInp.style.borderColor = 'red';
    }

    if (!subTriggerPhone){
        phoneInp.style.borderColor = 'red'
    }

    if (!(subTriggerName && subTriggerPhone)){
        event.preventDefault();
    } else {
        event.preventDefault();
        bodyLoad.classList.add('bodyloading');
        outForm()

        let formElem = document.querySelector("#form");
        let response = await fetch('/mail/send.php', {
            method: 'POST',
            body: new FormData(formElem)
        });

        let result = await response.json();
        if (result.result == "success"){
            formElem.reset();
            bodyLoad.classList.remove('bodyloading');
            createMessage(true)
        } else {
            formElem.reset(); 
            bodyLoad.classList.remove('bodyloading');
            createMessage(false)
        }
    }
}, true);

let outForm = function(){
    form.style.display = 'none';
    formBlock.classList.remove('formBlockActive');
    if (subButton.className === 'buttonActive'){
        subButton.classList.remove('buttonActive');
    }
    nameInp.style.borderColor = 'var(--green)';
    phoneInp.style.borderColor = 'var(--green)';
}

closeButton.onclick = outForm

let removeMessage = function(){
    this.remove();
}

let createMessage = function(bol){
    if(bol){
        let messageSuccess = document.createElement('div');
        messageSuccess.className = 'message'
        messageSuccess.innerHTML = '<div class=\'messBlock succMess\'><img src="./imgs/greenMark.svg" class="succMark"><p>Ваша заявка успешно отправлена!</p></div>';
        document.body.insertBefore(messageSuccess, form);
        messageSuccess.onclick = removeMessage
    } else {
        let messageFail = document.createElement('div');
        messageFail.className = 'message'
        messageFail.innerHTML = '<div class=\'messBlock errMess\'><img src="./imgs/error.svg" class="errorMark"><p>Ошибка</p><p>Попробуйте повторить попытку позже</p></div>';
        document.body.insertBefore(messageFail, form);
        messageFail.onclick = removeMessage
    }
}
