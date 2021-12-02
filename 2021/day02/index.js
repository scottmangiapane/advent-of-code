import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day02/input.txt'))
    .toString().trim().split('\n');

function solveP1() {
    let x = 0;
    let depth = 0;
    for (const line of input) {
        const [, direction, amount] = /^([a-z]+) ([0-9]+)$/.exec(line);
        switch (direction) {
            case 'forward':
                x += parseInt(amount);
                break;
            case 'up':
                depth -= parseInt(amount);
                break;
            case 'down':
                depth += parseInt(amount);
                break;
        }
    }
    console.log('x: ' + x);
    console.log('depth: ' + depth);
    return x * depth;
}

function solveP2() {
    let x = 0;
    let depth = 0;
    let aim = 0;
    for (const line of input) {
        const [, direction, amount] = /^([a-z]+) ([0-9]+)$/.exec(line);
        switch (direction) {
            case 'forward':
                x += parseInt(amount);
                depth += aim * amount;
                break;
            case 'up':
                aim -= parseInt(amount);
                break;
            case 'down':
                aim += parseInt(amount);
                break;
        }
    }
    console.log('x: ' + x);
    console.log('depth: ' + depth);
    return x * depth;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));