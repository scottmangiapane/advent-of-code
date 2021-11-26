import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('2020/day10/input.txt')
    .toString().trim().split('\n')
    .map(i => parseInt(i));

const deviceAdapter = Math.max(...input) + 3;

input.push(0, deviceAdapter);
input.sort((a, b) => a - b);

let j1 = 0;
let j3 = 0;
for (let i = 0; i < input.length - 1; i++) {
    switch (input[i + 1] - input[i]) {
        case 1:
            j1++;
            break;
        case 3:
            j3++;
            break;
    }
}

console.log('j1: ' + j1);
console.log('j3: ' + j3);

const part1 = j1 * j3;
console.log('Part 1: ' + chalk.green(part1));

function findParents(child) {
    const index = input.findIndex(val => val === child);
    return input.filter(val => val < input[index] && val >= input[index] - 3);
}

const stepsTaken = {};

for (const val of input) {
    const steps = findParents(val)
        .map(parent => stepsTaken[parent] || 1)
        .reduce((a, b) => a + b, 0);
    stepsTaken[val] = steps;
}

const part2 = stepsTaken[deviceAdapter];
console.log('Part 2: ' + chalk.green(part2));