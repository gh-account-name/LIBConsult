let slides = document.querySelectorAll('.sliderContent');

let k = 0;

let toggle = function(){
    if (k < slides.length-1){
        slides[k].classList.remove('sliderContentShow');
        k++;
        slides[k].classList.add('sliderContentShow');
    } else {
        slides[k].classList.remove('sliderContentShow');
        slides[0].classList.add('sliderContentShow');
        k = 0;
    }
}

setInterval(toggle, 5000)