import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day11/input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split('').map(col => parseInt(col)));

function solveP1() {
    let flashCount = 0;
    for (let n = 0; n < 100; n++) {
        const flashed = [
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ]
        ];
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                flashCount += flash(flashed, i, j);
            }
        }
    }
    return flashCount;
}

function flash(flashed, i, j) {
    if (i >= 0 && j >= 0 && i < 10 && j < 10 && !flashed[i][j]) {
        input[i][j]++;
        if (input[i][j] > 9) {
            flashed[i][j] = true;
            input[i][j] = 0;
            return 1
                + flash(flashed, i - 1, j - 1)
                + flash(flashed, i - 1, j)
                + flash(flashed, i - 1, j + 1)
                + flash(flashed, i, j - 1)
                + flash(flashed, i, j + 1)
                + flash(flashed, i + 1, j - 1)
                + flash(flashed, i + 1, j)
                + flash(flashed, i + 1, j + 1);
        }
    }
    return 0;
}

function solveP2() {
    let n = 0;
    while (true) {
        let iterationFlashCount = 0;
        const flashed = [
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ],
            [ false, false, false, false, false, false, false, false, false, false ]
        ];
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                iterationFlashCount += flash(flashed, i, j);
            }
        }
        n++;
        console.log(iterationFlashCount);
        if (iterationFlashCount === 100) {
            return n;
        }
    }
    return 'err';
}

// const p1 = solveP1();
// console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));