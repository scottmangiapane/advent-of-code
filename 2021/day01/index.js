import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day01/input.txt'))
    .toString().trim().split('\n');

function solve(windowSize) {
    let sum = 0;
    for (let i = 0; i < windowSize && i < input.length; i++) {
        sum += parseInt(input[i]);
    }
    let count = 0;
    let last = sum;
    for (let i = 0; i < input.length - windowSize; i++) {
        sum -= parseInt(input[i]);
        sum += parseInt(input[i + windowSize]);
        if (sum > last) {
            count++;
        }
        last = sum;
    }
    return count;
}

const p1 = solve(1);
const p2 = solve(3);

console.log('Part 1: ' + chalk.green(p1));
console.log('Part 2: ' + chalk.green(p2));