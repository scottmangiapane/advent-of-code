import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('day05/input.txt')
    .toString().trim().split('\n');

function search(input, low, high, lowChar, highChar) {
    if (low === high) {
        return low;
    }
    const half = (high - low + 1) / 2;
    if (input.charAt(0) === lowChar) {
        return search(input.substring(1), low, high - half, lowChar, highChar);
    }
    if (input.charAt(0) === highChar) {
        return search(input.substring(1), low + half, high, lowChar, highChar);
    }
}

let seats = [];

for (const line of input) {
    const [, rowLine, colLine] = /^([BF]+)([LR]+)$/.exec(line);
    const row = search(rowLine, 0, 127, 'F', 'B');
    const col = search(colLine, 0, 7, 'L', 'R');
    seats.push(row * 8 + col);
}

seats = seats.sort((a, b) => parseInt(a) - parseInt(b));

const part1 = seats[seats.length - 1];

let part2;
for (let i = 0; i < seats.length - 1; i++) {
    if (seats[i + 1] != seats[i] + 1) {
        part2 = seats[i] + 1;
    }
}

console.log('Part 1: ' + chalk.green(part1));
console.log('Part 2: ' + chalk.green(part2));