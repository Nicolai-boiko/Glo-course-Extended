let input = document.querySelector('#input');
let text = document.querySelector('.text');

function debounce(func, wait = 300, immediate = false) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
function showText() {
    text.innerText = input.value;
}

input.addEventListener('input', debounce(showText))
