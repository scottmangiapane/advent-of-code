import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day14/input.txt'))
    .toString().trim().split('\n')
    .map(line => line.split(' -> ')
        .map(point => point.split(',')
            .map(value => parseInt(value))));

const [startX, startY] = [500, 0];
let maxY = 0;
for (const line of input) {
    for (const [, y] of line) {
        maxY = Math.max(maxY, y);
    }
}
const minX = startX - maxY - 2;
const maxX = startX + maxY + 2;

function buildMapP1() {
    const map = Array.from(Array(maxY + 1), () => Array(maxX - minX + 1).fill('.'));
    for (const line of input) {
        let [lastX, lastY] = line[0];
        for (const [x, y] of line) {
            map[y][x - minX] = '#';
            const dX = (x - lastX) / Math.abs(x - lastX);
            const dY = (y - lastY) / Math.abs(y - lastY);
            for (let i = lastX; dX && i !== x; i += dX) { map[y][i - minX] = '#' }
            for (let i = lastY; dY && i !== y; i += dY) { map[i][x - minX] = '#' }
            lastX = x;
            lastY = y;
        }
    }
    return map;
}

function buildMapP2() {
    const map = buildMapP1();
    map.push(Array(maxX - minX + 1).fill('.'));
    map.push(Array(maxX - minX + 1).fill('#'));
    return map;
}

function placeSandP1(map, x, y) {
    if (y === maxY) { return false; }
    if (map[y + 1][x - minX] === '.') { return placeSandP1(map, x, y + 1); }
    if (map[y + 1][x - minX - 1] === '.') { return placeSandP1(map, x - 1, y + 1); }
    if (map[y + 1][x - minX + 1] === '.') { return placeSandP1(map, x + 1, y + 1); }
    map[y][x - minX] = 'o';
    return true;
}

function placeSandP2(map, x, y) {
    if (map[startY][startX - minX] === 'o') { return false; }
    if (map[y + 1][x - minX] === '.') { return placeSandP2(map, x, y + 1); }
    if (map[y + 1][x - minX - 1] === '.') { return placeSandP2(map, x - 1, y + 1); }
    if (map[y + 1][x - minX + 1] === '.') { return placeSandP2(map, x + 1, y + 1); }
    map[y][x - minX] = 'o';
    return true;
}

const mapP1 = buildMapP1();
let p1;
for (p1 = 0; placeSandP1(mapP1, startX, startY); p1++);
console.log('Part 1: ' + chalk.green(p1));

const mapP2 = buildMapP2();
let p2;
for (p2 = 0; placeSandP2(mapP2, startX, startY); p2++);
console.log('Part 2: ' + chalk.green(p2));