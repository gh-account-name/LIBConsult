let menu = document.querySelector('header nav');
let menuButton = document.querySelector('.mobileMenu');
let menuTrigger = false;
let body = document.querySelector('body');
let span = document.querySelector('.head header .mobileMenu>span');
let navLi = document.querySelectorAll('nav ul li');
let hrefA = document.querySelectorAll('nav ul li a');

let toggleNav = function(bol){
    if(bol){
        menu.classList.remove('navActive');
        body.style.overflow = 'auto'
        menuButton.classList.remove('mobileMenuActive');
        menuTrigger = false;
    } else {
        menu.classList.add('navActive');
        body.style.overflow = 'hidden'
        menuButton.classList.add('mobileMenuActive');
        menuTrigger = true;
    }
}

menuButton.onclick = function(){
    toggleNav(menuTrigger);   
}

for (let i = 0; i<navLi.length;i++){
    navLi[i].onclick = function(){
        let availableScreenWidth = window.screen.availWidth;
        let screenWidth = window.screen.width;
        let windowOuterWidth = window.outerWidth;
        let windowInnerWidth = window.innerWidth;
        if (Math.min(availableScreenWidth, screenWidth, windowOuterWidth, windowInnerWidth)<=768){
            toggleNav(menuTrigger);
            document.location.href = hrefA[i].href;
        }
    }
}