import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day09/input.txt'))
    .toString().trim().split('\n')
    .map(line => {
        const [direction, amount] = line.split(' ');
        return { direction, amount: parseInt(amount) };
    });

const directionMap = {
    'L': { xDelta: -1, yDelta: 0 },
    'R': { xDelta: 1, yDelta: 0 },
    'U': { xDelta: 0, yDelta: -1 },
    'D': { xDelta: 0, yDelta: 1 },
}

function movePoint(x1, y1, x2, y2) {
    if (x1 != x2 && Math.abs(y1 - y2) > 1
        || y1 != y2 && Math.abs(x1 - x2) > 1) {
        x2 += (x1 - x2) / Math.abs(x1 - x2);
        y2 += (y1 - y2) / Math.abs(y1 - y2);
    } else
    if (Math.abs(x1 - x2) > 1) {
        x2 += (x1 - x2) / Math.abs(x1 - x2);
    } else
    if (Math.abs(y1 - y2) > 1) {
        y2 += (y1 - y2) / Math.abs(y1 - y2);
    }
    return { x: x2, y: y2 };
}

function solve(size) {
    const tailVisits = { 0: [0] };
    let xList = Array(size).fill(0), yList = Array(size).fill(0);
    for (const line of input) {
        const { direction, amount } = line;
        const { xDelta, yDelta } = directionMap[direction];
        xList[0] += xDelta * amount;
        yList[0] += yDelta * amount;
        for (let i = 0; i < amount; i++) {
            for (let j = 0; j < size - 1; j++) {
                const { x, y } = movePoint(xList[j], yList[j], xList[j + 1], yList[j + 1]);
                xList[j + 1] = x;
                yList[j + 1] = y;
            }
            tailVisits[xList[size - 1]] = tailVisits[xList[size - 1]] || [];
            if (!tailVisits[xList[size - 1]].includes(yList[size - 1])) {
                tailVisits[xList[size - 1]].push(yList[size - 1]);
            }
        }
    }
    return Object.values(tailVisits)
        .map(yList => yList.length)
        .reduce((a, c) => a + c);
}

const p1 = solve(2);
console.log('Part 1: ' + chalk.green(p1));

const p2 = solve(10);
console.log('Part 2: ' + chalk.green(p2));