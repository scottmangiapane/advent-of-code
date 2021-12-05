import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day05/input.txt'))
    .toString().trim().split('\n').map(line => {
        const [, rawX1, rawY1, rawX2, rawY2] = /^(\d+),(\d+) -> (\d+),(\d+)$/.exec(line);
        return {
            x1: parseInt(rawX1),
            y1: parseInt(rawY1),
            x2: parseInt(rawX2),
            y2: parseInt(rawY2)
        };
    });

const points = {};

function addStraightLines() {
    for (const line of input) {
        const { x1, y1, x2, y2 } = line;
        if (y1 === y2) {
            const min = Math.min(x1, x2);
            const max = Math.max(x1, x2);
            for (let i = min; i <= max; i++) {
                process(points, i, y1);
            }
        }
        if (x1 === x2) {
            const min = Math.min(y1, y2);
            const max = Math.max(y1, y2);
            for (let i = min; i <= max; i++) {
                process(points, x1, i);
            }
        }
    }
}

function addDiagonalLines() {
    for (const line of input) {
        const { x1, y1, x2, y2 } = line;
        if (x1 !== x2 && y1 !== y2) {
            const xMin = Math.min(x1, x2);
            const xMax = Math.max(x1, x2);
            const m = (x1 > x2 && y1 > y2 || x2 > x1 && y2 > y1) ? 1 : -1;
            const b = y1 - m * x1;
            for (let x = xMin; x <= xMax; x++) {
                const y = m * x + b;
                process(points, x, y);
            }
        }
    }
}

function process(points, x, y) {
    points[`${ x }_${ y }`] = points[`${ x }_${ y }`] || 0;
    points[`${ x }_${ y }`]++;
}

addStraightLines();
const p1 = Object.values(points).filter(p => p >= 2).length;
console.log('Part 1: ' + chalk.green(p1));

addDiagonalLines();
const p2 = Object.values(points).filter(p => p >= 2).length;
console.log('Part 2: ' + chalk.green(p2));