function letsPlay () {

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    };
    let randomNumber = randomInteger(1, 100);
    let attempts = 10;

    (function start(){
        console.dir(start);
        console.dir(letsPlay);
        let number = randomNumber;
        console.log(number);
        let enterNumber = prompt('Угадай число от 1 до 100');
            if (enterNumber === null){
                alert('Игра окончена');
            } else if (!isNumber(enterNumber)){
                alert('Введи число!');
                start();
            } else {
                if (+enterNumber > number) {
                    --attempts;
                        if (attempts === 0) {
                            let tryAgain = confirm('Попытки закончились, хотите сыграть еще?');
                            tryAgain ? letsPlay () : alert('Игра окончена');
                        } else {
                            alert(`Загаданное число меньше, осталось попыток ${attempts}`);
                            start();
                        }
                } else if (+enterNumber < number) {
                    --attempts;
                        if (attempts === 0) {
                            let tryAgain = confirm('Попытки закончились, хотите сыграть еще?');
                                tryAgain ? letsPlay () : alert('Игра окончена');
                        } else {
                            alert(`Загаданное число больше, осталось попыток ${attempts}`);
                            start();
                        }
                } else if (+enterNumber === number) {
                    alert('Поздравляю, Вы угадали!!!');
                    let tryAgain = confirm('Хотите сыграть еще?');
                            tryAgain ? letsPlay () : alert('Игра окончена');
                }
        }
    })();
    
}
letsPlay ();