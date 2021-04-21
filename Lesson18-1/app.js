let input = document.querySelector('#input');
let text = document.querySelector('.text');

function debounce(func, wait = 300, immediate = false) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
function showText() {
    text.innerText = input.value;
}

input.addEventListener('input', debounce(showText))
