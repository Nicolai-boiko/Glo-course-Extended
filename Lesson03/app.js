let lang = prompt('Введите язык использования ru или en', 'ru');

// Условие if
if (lang === 'ru') {
    console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье')
} else if (lang === 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
    location.reload()
}

//Switch-case
switch (lang) {
    case 'ru': console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
    break;
    case 'en': console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
    default: location.reload();
}

// Многомерный массив
let arr = new Map ([
    ['ru', 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'],
    ['en', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']
]);

console.log(arr.get(lang));

//Проверка имени
let namePerson = prompt('Введите имя', 'Максим');

namePerson === 'Артём' ? console.log('директор') :
namePerson === 'Максим' ? console.log('преподаватель') : 
console.log('студент');
