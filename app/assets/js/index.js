const increase = document.querySelectorAll('.increase');
const numbers = document.querySelector('.numbers');
function increaseFunc() {
    increase.forEach((elem) => {
        let blockMeaning = elem;
        let meaning = elem.textContent;
        let meaningNumber = Number(meaning);
        const numberFrames = 100;
        const duration = 1000;
        const timer = 1000 / numberFrames;
        const numberAllFrames = Math.round(duration / timer);
        let zero = 0;
        let one = meaningNumber / numberAllFrames;
        let interval = setInterval(() => {
            zero = Math.min(zero + one, meaningNumber);
            blockMeaning.innerHTML = zero.toFixed(0);
            if(zero === meaningNumber) {
                clearInterval(interval);
            }
        }, timer);
    });
}
increaseFunc();

const slider = document.getElementById('slider');
const slides = document.getElementById('slides');
const sliderButtons = document.getElementById('slider__buttons');
const sliderButtonLeft = document.getElementById('slider__button-left');
const sliderButtonRight = document.getElementById('slider__button-right');
let sliderThisNumber = document.getElementById('slider__this-number');
let sliderMaxNumber = document.getElementById('slider__max-number');
let slideItem = document.querySelectorAll('.slide__item');
let slideItemLength = slideItem.length;
sliderMaxNumber.innerHTML = slideItemLength;
for(let i = 0; i < slideItem.length; i++) {
    let slideItemHeight = slideItem[i].offsetHeight;
    if(slideItemHeight > slides.offsetHeight) {
        slides.style.height = slideItemHeight + 'px';
    }
}


let i = 0;
sliderButtonLeft.addEventListener('click', function (e) {
    if(i === 0) {
        e.target.classList.add('solve-problems__nav-slider-button_disabled');
    } else {
        sliderButtonRight.classList.remove('solve-problems__nav-slider-button_disabled');
        e.target.classList.remove('solve-problems__nav-slider-button_disabled');
        slideItem[i].classList.remove('solve-problems__item_active');
        i--;
        if (i < 0) {
            i = slideItem.length -1;
        }
        slideItem[i].classList.add('solve-problems__item_active');
        sliderThisNumber.innerHTML = Number([i]) + 1;
        if(i === 0) {
            e.target.classList.add('solve-problems__nav-slider-button_disabled');
        }
    }
});
sliderButtonRight.addEventListener('click', function (e) {
    if(i === Number(slideItemLength) -1) {
        e.target.classList.add('solve-problems__nav-slider-button_disabled');
    } else {
        sliderButtonLeft.classList.remove('solve-problems__nav-slider-button_disabled');
        e.target.classList.remove('solve-problems__nav-slider-button_disabled');
        slideItem[i].classList.remove('solve-problems__item_active');
        i++;
        if (i >= slideItem.length) {
            i = 0;
        }
        slideItem[i].classList.add('solve-problems__item_active');
        sliderThisNumber.innerHTML = Number([i]) + 1;
        if(i === Number(slideItemLength) -1) {
            e.target.classList.add('solve-problems__nav-slider-button_disabled');
        }
    }
    
});


const instructionItem = document.querySelectorAll('.instruction__item');
const instructionItemButton = document.querySelectorAll('.instruction__item-button');
instructionItemButton.forEach((elem) => {
    elem.addEventListener('click', function(e) {
        instructionItem.forEach(item => {
            item.classList.remove('instruction__item_active');
            this.parentNode.classList.add('instruction__item_active');
        });
    });
});


const solveProblemsTabButton = document.querySelectorAll('.solve-problems__tab-button');
solveProblemsTabButton.forEach((elem) => {
    elem.addEventListener('click', function(e) {
        solveProblemsTabButton.forEach(item => {
            item.classList.remove('solve-problems__tab-button_active');
        });
        elem.classList.add('solve-problems__tab-button_active');
    });
});