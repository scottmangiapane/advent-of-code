import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('day03/input.txt')
    .toString().trim().split('\n');

const height = input.length;
const width = input[0].length;

let x, y, trees;

function dive(slopeX, slopeY) {
    x = (x + slopeX) % width;
    y += slopeY;
}

function isTree() {
    return input[y].charAt(x) === '#';
}

function calculateSlope(slopeX, slopeY) {
    x = 0, y = 0, trees = 0;
    while (y < height) {
        if (isTree()) {
            trees += 1;
        }
        dive(slopeX, slopeY);
    }
    return trees;
}

const slope1_1 = calculateSlope(1, 1);
const slope3_1 = calculateSlope(3, 1);
const slope5_1 = calculateSlope(5, 1);
const slope7_1 = calculateSlope(7, 1);
const slope1_2 = calculateSlope(1, 2);
const total = slope1_1 * slope3_1 * slope5_1 * slope7_1 * slope1_2;

console.log('Part 1: ' + chalk.green(slope3_1));

console.log('slope1_1: ' + slope1_1);
console.log('slope3_1: ' + slope3_1);
console.log('slope5_1: ' + slope5_1);
console.log('slope7_1: ' + slope7_1);
console.log('slope1_2: ' + slope1_2);

console.log('Part 2: ' + chalk.green(total));