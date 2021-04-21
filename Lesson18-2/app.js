let startStop = document.querySelector('.start');
let reset = document.querySelector('.reset');
let circle = document.querySelector('.circle');


let animate = false;
let reqId;
function showAnimation() {
    if (!animate){
        animation();
        animate = true;
    } else {
        cancelAnimationFrame(reqId);
        animate = false;
    }
}
function animation() {
    reqId = requestAnimationFrame(animation);
    circle.style.top = (parseInt(getComputedStyle(circle).top, 10) + 10) + 'px';
}
function resetAnimation() {
    circle.style.top = startStop.style.height;
    cancelAnimationFrame(reqId);
}

startStop.addEventListener('click', showAnimation);
reset.addEventListener('click', resetAnimation);