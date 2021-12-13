import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day09/input.txt'))
    .toString().trim().split('\n');

function solveP1() {
    return null;
}

function solveP2() {
    return null;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));