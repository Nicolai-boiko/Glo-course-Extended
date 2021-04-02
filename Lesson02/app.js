let num = 266219;
let result = 1;
for (let i = 0; i < num.toString().length; i++) {
    result *= +num.toString()[i];
}
console.log(+(result**3).toString().substr(0, 2));