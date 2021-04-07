let arr = ['65412651', '256265465', '465150656', '549416556', '2596517649', '4641651985', '95984566'];
arr.forEach((number) => {
    if (number.startsWith('2') || number.startsWith('4')) {
        console.log(number);
    }
});


primeNumber:
for (let i = 2; i < 100; i++) {
    for (let j = 2; j < i; j++) {
        if ( i % j == 0) {
            continue primeNumber;
        }     
    }
    console.log(`${i} делится на 1 и ${i}`);
}