import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day03/input.txt'))
    .toString().trim().split('\n');

function findSharedCharP1(s1, s2) {
    for (const c of s1) {
        if (s2.includes(c)) {
            return c;
        }
    }
}

function findSharedCharP2(s1, s2, s3) {
    for (const c of s1) {
        if (s2.includes(c) && s3.includes(c)) {
            return c;
        }
    }
}

function priority(c) {
    return (c.toLowerCase() === c) ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38;
}

function solveP1() {
    let sum = 0;
    for (const line of input) {
        const p1 = line.substring(0, line.length / 2).split('');
        const p2 = line.substring(line.length / 2, line.length).split('');
        sum += priority(findSharedCharP1(p1, p2));
    }
    return sum;
}

function solveP2() {
    let sum = 0;
    for (let i = 0; i < input.length; i += 3) {
        sum += priority(findSharedCharP2(
            input[i].split(''),
            input[i + 1].split(''),
            input[i + 2].split('')
        ));
    }
    return sum;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));