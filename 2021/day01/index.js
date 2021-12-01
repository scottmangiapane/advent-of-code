import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day01/input.txt'))
    .toString().trim().split('\n');

let count = 0;
let last = input[0];
for (let i = 0; i < input.length; i++) {
    const value = parseInt(input[i]);
    if (value > last) {
        count++;
    }
    last = value;
}

console.log(count);

let count2 = 0;
let last2 = 0;
for (let i = 0; i < input.length - 2; i++) {
    const sum = parseInt(input[i])
        + parseInt(input[i + 1])
        + parseInt(input[i + 2]);
    if (sum > last2) {
        count2++;
    }
    last2 = sum;
}

console.log(count2 - 1);