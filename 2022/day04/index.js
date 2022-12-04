import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day04/input.txt'))
    .toString().trim().split('\n')
    .map(pair => pair.split(',')
        .map(sections => sections.split('-')
            .map(val => parseInt(val))));

function solveP1() {
    let sum = 0;
    for (const line of input) {
        const [l, r] = line
        if (l[0] >= r[0] && l[1] <= r[1] || r[0] >= l[0] && r[1] <= l[1]) {
            sum += 1;
        }
    }
    return sum;
}

function solveP2() {
    let sum = 0;
    for (const line of input) {
        const [l, r] = line
        if (l[0] >= r[0] && l[0] <= r[1] || l[1] >= r[0] && l[1] <= r[1]
            || r[0] >= l[0] && r[0] <= l[1] || r[1] >= l[0] && r[1] <= l[1]) {
            sum += 1;
        }
    }
    return sum;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));