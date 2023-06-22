const slides = Array.from(document.querySelectorAll('.slide'));
const navBar = Array.from(document.querySelectorAll('.circle'));
const balloons = Array.from(document.querySelectorAll('.balloon'));
const heroText = document.getElementById('hero-text');

console.log(heroText);

const num = slides.length;
let cur = 0;
let prev = 0;
slides[0].style.display = "flex";

for(let i = 0;i<balloons.length;i++) {
    let width = window.innerWidth;
    balloons[i].style.left=(i*width/balloons.length) + "px";
    balloons[i].style.bottom = "-150px";
}

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

leftBtn.addEventListener('click',function(e) {
    cur--;
    if(cur < 0) cur += num;
    slides[cur].style.display = "flex";
    slides[prev].style.display = "none";
    prev = cur;
});

rightBtn.addEventListener('click',function(e) {
    cur++;
    if(cur >= num) cur -= num;
    slides[cur].style.display = "flex";
    slides[prev].style.display = "none";
    prev = cur;

});

for(let i = 0;i<num;i++) {
    navBar[i].addEventListener('click',function(e) {
        cur = i;
        if(prev != cur) {
        slides[cur].style.display = "flex";
        slides[prev].style.display = "none";
        }
        prev = cur;
    });
}

let newSlide = function() {
    
    cur++;
    if(cur >= num) cur -= num;
    slides[cur].style.display = "flex";
    slides[prev].style.display = "none";
    prev = cur;
}
let switchPages = function() {
    setInterval(newSlide,2500);
}


let background = function() {
    for(let index = 0;index<balloons.length;index++) {
        let element = balloons[index];
        console.log(element);
        setInterval( function() {
            let curY = 1.5;
            let newY = (parseInt(element.style.bottom,10) + curY);
            element.style.bottom = newY + "px";
            heroText.style.bottom = (newY - 200) + "px";
            let diff = (index*parseInt(window.innerWidth,10)/balloons.length) - parseInt(element.style.left,10);
            if(diff == 0) {
                diff = Math.random()*1;
            }
            let rand = Math.cos(Math.random()) + Math.random() - Math.random()*Math.log(diff);
        
            let check = Math.random();
            if(check <= 1 - 0.3/Math.sqrt(diff)) {
                rand *= -1;
            }
        
            
            let newOne = parseInt(element.style.left,10)+rand;
        
            element.style.left = newOne + "px";
        
        },10);
    }
}
let x = document.getElementById("myAudio").autoplay;

background();
switchPages();