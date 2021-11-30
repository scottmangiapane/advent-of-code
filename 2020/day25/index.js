import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('2020/day25/input.txt')
    .toString().trim().split('\n');

const key1 = parseInt(input[0]);
const key2 = parseInt(input[1]);

console.log('Part 1: ' + chalk.green());
console.log('Part 2: ' + chalk.green());