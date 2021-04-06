function cutValidString (string) {
    if (typeof(string) === 'string' && string.length <= 30) {
        return string.trim()
    } else if (typeof(string) === 'string' && string.length >= 30) {
        return string.slice(0, 30) + '...'
    } else {
        alert('В виде аргумента передана не строка!')
    };
};

console.log(cutValidString(    'йцукенгшщфывапролдчсмитьбапролд'   ));