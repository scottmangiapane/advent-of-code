const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day09/input.txt')
    .toString().trim().split('\n')
    .map(line => parseInt(line));

// const preamble = input;

// const remainder = preamble.splice(25);

// function isMatched(preamble, line) {
//     for (let i = 0; i < preamble.length; i++) {
//         for (let j = i + 1; j < preamble.length; j++) {
//             if (preamble[i] + preamble[j] === line) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// let part1;

// while (remainder.length > 0) {
//     if (!isMatched(preamble, remainder[0])) {
//         part1 = remainder[0];
//         console.log('#!#! FOUND IT: ' + part1);
//         break;
//     }
//     preamble.push(remainder.shift());
//     preamble.shift();
// }

// console.log('Part 1: ' + chalk.green());

let part1 = 144381670

function getSum(array) {
    let total = 0;
    for (const i of array) {
        total += i;
    }
    return total;
}

let pieces = [];

while (true) {
    while (getSum(pieces) < part1) {
        pieces.push(input.shift());
    }

    if (getSum(pieces) === part1) {
        pieces = pieces.sort((a,b) => a < b);
        console.log('#!#! FOUND IT: ' + JSON.stringify(pieces));
        console.log('#!#! sum: ' + getSum(pieces));
        console.log('#!#! answer: ' + (pieces[0] + pieces[pieces.length - 1]));
        process.exit();
    }

    pieces.shift();
}

// not 20285626
// not 16250392

console.log('Part 2: ' + chalk.green());