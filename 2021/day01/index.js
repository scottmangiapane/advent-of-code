import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day01/input.txt'))
    .toString().trim().split('\n').map(line => parseInt(line));

function solve(windowSize) {
    let count = 0;
    for (let i = 0; i < input.length - windowSize; i++) {
        if (input[i + windowSize] > input[i]) {
            count++;
        }
    }
    return count;
}

const p1 = solve(1);
const p2 = solve(3);

console.log('Part 1: ' + chalk.green(p1));
console.log('Part 2: ' + chalk.green(p2));