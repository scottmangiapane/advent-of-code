const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day01/input.txt')
    .toString().trim().split('\n');

for (let i = 0; i < input.length; i++) {
    const num1 = parseInt(input[i]);
    for (let j = i + 1; j < input.length; j++) {
        const num2 = parseInt(input[j]);
        if (num1 + num2 === 2020) {
            console.log('num1: ' + num1);
            console.log('num2: ' + num2);
            console.log('Part 1: ' + chalk.green(num1 * num2));
        }
        for (let k = j + 1; k < input.length; k++) {
            const num3 = parseInt(input[k]);
            if (num1 + num2 + num3 === 2020) {
                console.log('num1: ' + num1);
                console.log('num2: ' + num2);
                console.log('num3: ' + num3);
                console.log('Part 2: ' + chalk.green(num1 * num2 * num3));
            }
        }
    }
}