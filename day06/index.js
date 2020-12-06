const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day06/input.txt')
    .toString().trim().split('\n\n');

let sum1 = 0;
let sum2 = 0;

for (const line of input) {
    const chars = line.replace(/\n/g, '');
    const questions = {};
    for (const char of chars) {
        questions[char] = questions[char] + 1 || 1;
    }
    sum1 += Object.keys(questions).length;
    const peopleCount = line.split('\n').length;
    for (const q in questions) {
        if (questions[q] === peopleCount) {
            sum2++;
        }
    }
}

console.log('Part 1: ' + chalk.green(sum1));
console.log('Part 2: ' + chalk.green(sum2));