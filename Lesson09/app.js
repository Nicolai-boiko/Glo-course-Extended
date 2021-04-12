function showDate () {

let weekArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октбяря', 'Ноября', 'Декабря'];

let date = new Date();
let day = date.getDay();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let dayDate = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();
let inputDateA = document.querySelector('.dateA');
let inputDateB = document.querySelector('.dateB');

function addZero(x) {
    return (parseInt(x, 10) < 10 ? '0' : '') + x;
};



function strHourEnd(str) {
    let lastNumber = str % 10;
    if (lastNumber === 1 && str !== 11) {
        return '';
    } else if ((lastNumber === 2 || lastNumber === 3 || lastNumber === 4) && (str !== 12 || str !== 13 || str !== 14)) {
        return 'а';
    } else {
        return 'ов';
    }
};

function strMinSecEnd(str) {
    let lastNumber = str % 10;
    if (lastNumber === 1 && str !== 11) {
        return 'а';
    } else if ((lastNumber === 2 || lastNumber === 3 || lastNumber === 4) && (str !== 12 || str !== 13 || str !== 14)) {
        return 'ы';
    } else {
        return '';
    }
};




inputDateA.innerHTML = `Сегодня ${weekArr[day]}, ${dayDate}, ${monthArr[month]} ${year} года, ${hours} час${strHourEnd(hours)} ${minutes} минут${strMinSecEnd(minutes)} ${seconds} секунд${strMinSecEnd(seconds)}`;
inputDateB.innerHTML = `${addZero(dayDate)}.${addZero(month)}.${year} - ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};

setInterval(showDate, 1000);