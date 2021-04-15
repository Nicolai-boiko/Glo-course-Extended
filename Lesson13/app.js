function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

let btn = document.querySelector('.button');
let body = document.querySelector('.body');
let text = document.querySelector('.text');

function showColor () {
    let rgb1 = randomInteger(0, 255);
    let rgb2 = randomInteger(0, 255);
    let rgb3 = randomInteger(0, 255);
    let color = `#${rgb1.toString(16)}${rgb2.toString(16)}${rgb3.toString(16)}`;
    body.style.background = color;
    text.innerText = color;
};



btn.addEventListener('click', showColor);