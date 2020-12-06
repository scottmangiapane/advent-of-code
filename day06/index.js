const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day06/input.txt')
    .toString().trim().split('\n\n');

let sum1 = 0;
for (const line of input) {
    const parsed = line.replace(/\n/g, '');
    const questions = {};
    for (let i = 0; i < parsed.length; i++) {
        questions[parsed[i]] = true;
    }
    sum1 += Object.keys(questions).length;
}

let sum2 = 0;
for (const line of input) {
    const parsed = line.replace(/\n/g, '');
    const questions = {};
    for (let i = 0; i < parsed.length; i++) {
        if (!!questions[parsed[i]]) {
            questions[parsed[i]]++;
        } else {
            questions[parsed[i]] = 1;
        }
    }
    console.log(line.length + '; ' + JSON.stringify(questions));
    for (const i in questions) {
        if (questions[i] != line.split(/\r\n|\r|\n/).length) {
            delete questions[i];
        }
    }
    sum2 += Object.keys(questions).length;
}

console.log('Part 1: ' + chalk.green(sum1));
console.log('Part 2: ' + chalk.green(sum2));