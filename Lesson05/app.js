let arr = ['65412651', '256265465', '465150656', '549416556', '2596517649', '4641651985', '95984566'];
arr.forEach((number) => {
    if (number.startsWith('2') || number.startsWith('4')) {
        console.log(number);
    }
});


function isPrime(n) {
    for (let i = 2; i < n; i++) {
      if ( n % i == 0) return false;
    }
    return true;
  }
  
  function showPrimes(n) {
  
    for (let i = 2; i < n; i++) {
      if (!isPrime(i)) continue;
  
      console.log(`${i} делится на 1 и ${i}`);
    }
  }
  showPrimes(100);
  