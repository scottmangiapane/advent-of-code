import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day01/input.txt'))
    .toString().trim().split('\n\n');


const caloriesPerElf = input
    .map(elf => elf
        .split('\n')
        .map(calories => parseInt(calories))
        .reduce((a, v) => a + v)
    );
caloriesPerElf.sort((a, b) => b - a);

function solveP1() {
    return caloriesPerElf[0];
}

function solveP2() {
    return caloriesPerElf[0]
        + caloriesPerElf[1]
        + caloriesPerElf[2];
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));