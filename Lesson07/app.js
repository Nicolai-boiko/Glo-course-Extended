let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let date = new Date();
let currentDay = date.getDay();

function showWeek () {
    for (let i = 0; i < 7; i++) {
        let element = document.createElement('div');
        if ((i === 5 && i === currentDay - 1) || (i === 6 && i === currentDay - 1)) {
          element.innerHTML = `<i><strong>${week[i]}</strong></i>`;  
        } else if (i === 5 || i === 6) {
            element.innerHTML = `<i>${week[i]}</i>`;
        } else if (i === currentDay - 1) {
            element.innerHTML = `<strong>${week[i]}</strong>`;
        } else {
        element.innerHTML = `${week[i]}`;
        };
        document.body.append(element);
        element.style.fontFamily = 'sans-serif';
    }
};
showWeek();
