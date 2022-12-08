import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day08/input.txt'))
    .toString().trim().split('\n')
    .map(line => line.split('').map(a => parseInt(a)));

const size = input.length;

function createMap(size, value) {
    return Array.from(Array(size), () => Array(size).fill(value));
}

function reduceMap(array, reducer) {
    return array.map(row => row.reduce(reducer)).reduce(reducer);
}

function solveP1() {
    const bitmap = createMap(size, 0);
    for (let i = 0; i < size; i++) {
        let lastL2R = -1, lastR2L = -1, lastT2B = -1, lastB2T = -1;
        for (let j = 0; j < size; j++) {
            if (input[i][j] > lastL2R) {
                bitmap[i][j] = 1;
                lastL2R = input[i][j];
            }
            if (input[i][size - 1 - j] > lastR2L) {
                bitmap[i][size - 1 - j] = 1;
                lastR2L = input[i][size - 1 - j];
            }
            if (input[j][i] > lastT2B) {
                bitmap[j][i] = 1;
                lastT2B = input[j][i];
            }
            if (input[size - 1 - j][i] > lastB2T) {
                bitmap[size - 1 - j][i] = 1;
                lastB2T = input[size - 1 - j][i];
            }
        }
    }
    return reduceMap(bitmap, (a, c) => a + c);
}

function count(array, i, j, coords) {
    let count = 0;
    for (let k = 0; k < size; k++) {
        const { i:y, j:x } = coords(i, j, k);
        if (y >= 0 && y < size && x >= 0 && x < size) {
            count++;
            if (array[y][x] >= array[i][j]) {
                break;
            }
        }
    }
    return count;
}

function solveP2() {
    const scores = createMap(size, 0);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            scores[i][j] = count(input, i, j, (i, j, k) => ({ i: i, j: j + 1 + k }))
                * count(input, i, j, (i, j, k) => ({ i: i, j: j - 1 - k }))
                * count(input, i, j, (i, j, k) => ({ i: i + 1 + k, j: j }))
                * count(input, i, j, (i, j, k) => ({ i: i - 1 - k, j: j }));
        }
    }
    return reduceMap(scores, (a, c) => Math.max(a, c));
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));