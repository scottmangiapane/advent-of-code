import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('2020/day09/input.txt')
    .toString().trim().split('\n')
    .map(line => parseInt(line));

const preamble = input.slice(0, 25);
const remainder = input.slice(25);

function isMatched(preamble, line) {
    for (let i = 0; i < preamble.length; i++) {
        for (let j = i + 1; j < preamble.length; j++) {
            if (preamble[i] + preamble[j] === line) {
                return true;
            }
        }
    }
    return false;
}

while (isMatched(preamble, remainder[0])) {
    preamble.push(remainder.shift());
    preamble.shift();
}

const part1 = remainder[0];
console.log('Part 1: ' + chalk.green(part1));

function getSum(array) {
    return array.reduce((total, num) => total + num , 0);
}

let addends = [];

while (getSum(addends) !== part1) {
    addends.shift();
    while (getSum(addends) < part1) {
        addends.push(input.shift());
    }
}

const min = Math.min(...addends);
const max = Math.max(...addends);
console.log('min: ' + min);
console.log('max: ' + max);

const part2 = min + max;
console.log('Part 2: ' + chalk.green(part2));