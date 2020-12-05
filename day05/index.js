const chalk = require('chalk');
const { assert } = require('console');
const fs = require('fs');
const { listeners } = require('process');

const input = fs
    .readFileSync('day05/input.txt')
    .toString().trim().split('\n');

let startRow;
let endRow;

let startCol;
let endCol;

function diveFB(char) {
    const half = (endRow - startRow + 1) / 2;
    if (char === 'B') {
        startRow += half;
    }
    if (char === 'F') {
        endRow -= half;
    }
}

function diveLR(char) {
    const half = (endCol - startCol + 1) / 2;
    if (char === 'R') {
        startCol += half;
    }
    if (char === 'L') {
        endCol -= half;
    }
}

let part1 = 0;
let part2 = 0;
let seats = [];

for (const line of input) {
    startRow = 0;
    endRow = 127;
    for (let i = 0; i < 7; i++) {
        diveFB(line.charAt(i));
    }
    if (startRow != endRow) {
        console.log('ERROR row');
    }
    // console.log('row: ' + startRow);

    startCol = 0;
    endCol = 7;
    for (let i = 7; i < 10; i++) {
        diveLR(line.charAt(i));
    }
    if (startCol != endCol) {
        console.log('ERROR col');
    }
    // console.log('col: ' + startCol);

    const score = startRow * 8 + startCol;
    part1 = Math.max(part1, score);

    seats.push(score);
}

seats = seats.sort((a, b) => parseInt(a) - parseInt(b));
for (let i = 0; i < seats.length - 1; i++) {
    if (seats[i + 1] != seats[i] + 1) {
        part2 = seats[i] + 1;
    }
}

console.log('Part 1: ' + chalk.green(part1));
console.log('Part 2: ' + chalk.green(part2));

// console.log(JSON.stringify(seats));