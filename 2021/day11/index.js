import chalk from 'chalk';
import { promises as fs } from 'fs';

async function parseInput() {
    return (await fs.readFile('2021/day11/input.txt'))
        .toString()
        .trim()
        .split('\n')
        .map(row => row.split('').map(col => parseInt(col)));
}

function initializFlashArray(input) {
    const flashed = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        flashed[i] = new Array(input[i].length);
        for (let j = 0; j < flashed.length; j++) {
            flashed[i][j] = false;
        }
    }
    return flashed;
}

function flash(input, flashed, i, j) {
    if (i >= 0 && i < 10 && j >= 0 && j < 10 && !flashed[i][j]) {
        input[i][j]++;
        if (input[i][j] > 9) {
            flashed[i][j] = true;
            input[i][j] = 0;
            return 1
                + flash(input, flashed, i - 1, j - 1)
                + flash(input, flashed, i - 1, j)
                + flash(input, flashed, i - 1, j + 1)
                + flash(input, flashed, i, j - 1)
                + flash(input, flashed, i, j + 1)
                + flash(input, flashed, i + 1, j - 1)
                + flash(input, flashed, i + 1, j)
                + flash(input, flashed, i + 1, j + 1);
        }
    }
    return 0;
}

async function solveP1() {
    const input = await parseInput();
    let flashCount = 0;
    for (let n = 0; n < 100; n++) {
        const flashed = initializFlashArray(input);
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                flashCount += flash(input, flashed, i, j);
            }
        }
    }
    return flashCount;
}

async function solveP2() {
    const input = await parseInput();
    let n = 0;
    while (true) {
        let flashCount = 0;
        const flashed = initializFlashArray(input);
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                flashCount += flash(input, flashed, i, j);
            }
        }
        n++;
        if (flashCount === 100) {
            return n;
        }
    }
}

const p1 = await solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = await solveP2();
console.log('Part 2: ' + chalk.green(p2));