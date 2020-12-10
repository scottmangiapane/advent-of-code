const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day10/input.txt')
    .toString().trim().split('\n')
    .map(i => parseInt(i));

input.push(0);
input.push(Math.max(...input) + 3);
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

console.log('Part 1: ' + chalk.green(j1 * j3));

function findIndexFromValue(val) {
    return input.findIndex(v => v === val);
}

function findParents(child) {
    const index = findIndexFromValue(child);
    return input.filter(val => val < input[index] && val >= input[index] - 3);
}

const stepsTaken = {};

for (const val of input) {
    const steps = findParents(val)
        .map(parent => stepsTaken[parent] || 1) // TODO remove "|| 0"?
        .reduce((a, b) => a + b, 0);
    stepsTaken[val] = steps;
}

console.log(JSON.stringify(stepsTaken));

// function fetchChildren(parent) {
//     return map[parent];
// }

// function countChildren(root) {
//     const children = fetchChildren(root);
//     if (children.length === 0) {
//         return 1;
//     }
//     let count = 0;
//     for (const child of children) {
//         count += countChildren(child);
//     }
//     return count;
// }

// const part2 = countChildren(input[0]);
// console.log('Part 2: ' + chalk.green(part2));