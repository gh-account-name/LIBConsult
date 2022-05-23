let button = document.querySelector('.documents p');
let hiddenElements = document.querySelectorAll(".documents .pictures .row:not(:first-child)");
let block = document.querySelector('.documents');
let blockInside = document.querySelector('.documents .pictures');
let trigger = false;
let disNone = function(){
    for (i of hiddenElements){
        i.style.display = 'none';
    }
    button.onclick = showFunc
}
let showFunc = function(){
    if (trigger == false) {
        button.innerHTML = '<span>▲</span>СВЕРНУТЬ<span>▲</span>';
        for (i of hiddenElements){
            i.style.display = 'flex';
        }
        // block.style.height = 'calc(1800vw*100/1920)'
        block.classList.add('documentsBigger')
        blockInside.classList.add('documentsOpen')
        trigger = true
    } else {
        button.innerHTML = '<span>▼</span>ПОСМОТРЕТЬ ВСЕ ДОКУМЕНТЫ<span>▼</span>'
        document.location.href = '#documents'
        // block.style.height = 'calc(700vw*100/1920)'
        block.classList.remove('documentsBigger')
        blockInside.classList.remove('documentsOpen')
        trigger = false
        button.onclick = null
        setTimeout(disNone, 1100)
    }
}
button.onclick = showFunc


let imgs = document.querySelectorAll('.documents img');
let bigPict = document.querySelector('.bigPict');
let bigImg = document.querySelector('.bigPict img');
for (i of imgs){
    i.onclick = function() {
        bigPict.style.display = 'flex';
        bigImg.src = this.src;
    }
}
bigPict.onclick = function(){
    bigPict.style.display = 'none'
}
