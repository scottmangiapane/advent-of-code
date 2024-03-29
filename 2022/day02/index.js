import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day02/input.txt'))
    .toString().trim().split('\n').map(line => line.split(' '));

function solveP1() {
    let sum = 0;
    const points = {
        'X': 1,
        'Y': 2,
        'Z': 3,
    };
    const win = {
        'X': 'C',
        'Y': 'A',
        'Z': 'B',
    };
    const draw = {
        'X': 'A',
        'Y': 'B',
        'Z': 'C',
    };
    for (const line of input) {
        sum += points[line[1]];
        if (win[line[1]] === line[0]) {
            sum += 6;
        }
        if (draw[line[1]] === line[0]) {
            sum += 3;
        }
    }
    return sum;
}

function solveP2() {
    let sum = 0;
    const lose = {
        'A': 3,
        'B': 1,
        'C': 2,
    };
    const draw = {
        'A': 1,
        'B': 2,
        'C': 3,
    };
    const win = {
        'A': 2,
        'B': 3,
        'C': 1,
    };
    for (const line of input) {
        switch (line[1]) {
            case 'X': // lose
                sum += lose[line[0]];
                break;
            case 'Y': // draw
                sum += draw[line[0]] + 3;
                break;
            case 'Z': // win
                sum += win[line[0]] + 6;
                break;
        }
    }
    return sum;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));