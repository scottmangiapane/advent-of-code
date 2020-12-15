const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day15/input.txt')
    .toString().trim().split(',')
    .map(e => parseInt(e));

function next(memory, last) {
    const array = memory[last];
    if (array.length === 1) {
        return 0;
    }
    while (array.length > 2) {
        array.shift();
    }
    return array[array.length - 1] - array[array.length - 2];
}

function solve(iterations) {
    const memory = {};
    let last = null;
    for (let i = 0; i < iterations; i++) {
        last = (i < input.length) ? input[i] : next(memory, last);
        memory[last] = memory[last] || [];
        memory[last].push(i);
    }
    return last;
}

console.log('Part 1: ' + chalk.green(solve(2020)));
console.log('Part 2: ' + chalk.green(solve(30000000)));