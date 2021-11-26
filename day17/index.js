import chalk from 'chalk';
import * as fs from 'fs';

const input = [
    fs
        .readFileSync('day17/input.txt')
        .toString().trim().split('\n')
        .map(line => line.split('').map(char => char === '#' ? 1 : 0))
];

input.unshift([
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
]);

input.push([
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
]);

function duplicate(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function countNeighbors(space, ...address) {
    if (address.length === 0) {
        return space;
    }
    let count = 0;
    const index = address[0];
    if (index > 0) {
        count += countNeighbors(space[index - 1], ...address.slice(1));
    }
    count += countNeighbors(space[index], ...address.slice(1));
    if (index < space.length - 1) {
        count += countNeighbors(space[index + 1], ...address.slice(1));
    }
    return count;
}

for (let cycle = 0; cycle < 1; cycle++) {
    const prev = duplicate(input);
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            for (let k = 0; k < input[i][j].length; k++) {
                const count = countNeighbors(prev, i, j, k) - prev[i][j][k];
                if (i === 0 && j === 2 && k === 2) {
                    console.log('input[i][j][k]: ' + input[i][j][k])
                    console.log(count);
                }
                if (prev[i][j][k]) {
                    input[i][j][k] = (count === 2 || count === 3) ? 1 : 0;
                } else {
                    input[i][j][k] = (count === 3) ? 1 : 0;
                }
            }
        }
    }
    console.log(JSON.stringify(prev));
    console.log(chalk.blue(JSON.stringify(input)));
}

console.log('Part 1: ' + chalk.green());
console.log('Part 2: ' + chalk.green());