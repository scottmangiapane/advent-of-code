import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day12/input.txt'))
    .toString().trim().split('\n').map(line => line.split(''));

function createMap(height, width, value) {
    return Array.from(Array(height), () => Array(width).fill(value));
}

function findLandmarks() {
    let start, end;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            switch (input[i][j]) {
                case 'S':
                    start = { i, j };
                    break;
                case 'E':
                    end = { i, j };
                    break;
            }
        }
    }
    return { start, end };
}

function canStepTo(i1, j1, i2, j2) {
    if (i1 >= 0 && j1 >= 0 && i2 >= 0 && j2 >= 0
            && i1 < input.length && j1 < input[0].length
            && i2 < input.length && j2 < input[0].length) {
        let c1 = input[i1][j1];
        let c2 = input[i2][j2];
        c1 = (c1 === 'S') ? 'a' : c1;
        c1 = (c1 === 'E') ? 'z' : c1;
        c2 = (c2 === 'S') ? 'a' : c2;
        c2 = (c2 === 'E') ? 'z' : c2;
        return c2.charCodeAt(0) - c1.charCodeAt(0) <= 1;
    }
    return false;
}

function solve(flexibleStart) {
    const visited = createMap(input.length, input[0].length, false);
    const { start, end } = findLandmarks();
    const q = [{ point: start, steps: 0 }];
    if (flexibleStart) {
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input.length; j++) {
                if (input[i][j] === 'a') {
                    q.push({ point: { i, j }, steps: 0 });
                }
            }
        }
    }
    while (q.length) {
        const { point: { i, j }, steps } = q.shift();
        if (i === end.i && j === end.j) {
            return steps;
        }
        if (!visited[i][j]) {
            if (canStepTo(i, j, i - 1, j)) { q.push({ point: { i: i - 1, j }, steps: steps + 1}); }
            if (canStepTo(i, j, i + 1, j)) { q.push({ point: { i: i + 1, j }, steps: steps + 1}); }
            if (canStepTo(i, j, i, j - 1)) { q.push({ point: { i, j: j - 1 }, steps: steps + 1}); }
            if (canStepTo(i, j, i, j + 1)) { q.push({ point: { i, j: j + 1 }, steps: steps + 1}); }
        }
        visited[i][j] = true;
    }
    return '???';
}

const p1 = solve(false);
console.log('Part 1: ' + chalk.green(p1));

const p2 = solve(true);
console.log('Part 2: ' + chalk.green(p2));