const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day11/input.txt')
    .toString().trim().split('\n');

const height = input.length;
const width = input[0].length;

function compareLayouts(layout1, layout2) {
    for (let i = 0; i < height; i++) {
        if (layout1[i] !== layout2[i]) {
            return false;
        }
    }
    return true;
}

function countOccupiedSeats(layout) {
    let count = 0;
    for (const line of layout) {
        for (const char of line) {
            if (char === '#') {
                count++;
            }
        }
    }
    return count;
}

function findSeat(input, x, y, dx, dy, recursive) {
    x += dx;
    y += dy;
    if (x < 0 || y < 0 || x >= width || y >= height) {
        return false;
    }
    if (input[y][x] === '.' && recursive) {
        return findSeat(input, x, y, dx, dy, recursive);
    }
    return (input[y][x] === '#');
}

function countAdjacent(input, x, y, recursive) {
    let count = 0;
    if (findSeat(input, x, y, -1, -1, recursive)) { count++; }
    if (findSeat(input, x, y, -1, 0, recursive)) { count++; }
    if (findSeat(input, x, y, -1, 1, recursive)) { count++; }
    if (findSeat(input, x, y, 0, -1, recursive)) { count++; }
    if (findSeat(input, x, y, 0, 1, recursive)) { count++; }
    if (findSeat(input, x, y, 1, -1, recursive)) { count++; }
    if (findSeat(input, x, y, 1, 0, recursive)) { count++; }
    if (findSeat(input, x, y, 1, 1, recursive)) { count++; }
    return count;
}

function calculateRound(input, tolerance, recursive) {
    const next = [];
    for (let y = 0; y < height; y++) {
        let newLine = '';
        for (let x = 0; x < width; x++) {
            const seat = input[y][x];
            const count = countAdjacent(input, x, y, recursive);
            if (seat === 'L' && count === 0) {
                newLine += '#';
            } else if (seat === '#' && count >= tolerance) {
                newLine += 'L';
            } else {
                newLine += seat;
            }
        }
        next.push(newLine);
    }
    return next;
}

function runTest(threshold, recursive) {
    let layout = input;
    while (true) {
        let nextLayout = calculateRound(layout, threshold, recursive);
        if (compareLayouts(layout, nextLayout)) {
            return countOccupiedSeats(layout);
        }
        layout = nextLayout;
    }
}

const part1 = runTest(4, false);
console.log('Part 1: ' + chalk.green(part1));

const part2 = runTest(5, true);
console.log('Part 2: ' + chalk.green(part2));