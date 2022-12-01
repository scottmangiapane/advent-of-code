import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day15/input.txt'))
    .toString().trim().split('\n')
    .map(line => line.split('').map(char => parseInt(char)));



function solveP1() {
    console.log(input);
}

function solveP2() {
    return null;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));