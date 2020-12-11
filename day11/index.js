const chalk = require('chalk');
const { count } = require('console');
const fs = require('fs');

const input = fs
    .readFileSync('day11/input.txt')
    .toString().trim().split('\n');

function findSeatInDirection(input, x, y, xDelta, yDelta, recursive) {
    const initial = input[y][x];
    x += xDelta;
    y += yDelta;
    if (x < 0 || y < 0 || x >= input[0].length || y >= input.length) { return false; }
    if (input[y][x] === '#') { return true; }
    if (input[y][x] === 'L') { return false; }
    if (recursive) {
        return findSeatInDirection(input, x, y, xDelta, yDelta, recursive);
    }
    return false;
}

function countAdjacent(input, x, y, recursive) {
    let count = 0;
    if (findSeatInDirection(input, x, y, -1, -1, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, -1, 0, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, -1, 1, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, 0, -1, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, 0, 1, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, 1, -1, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, 1, 0, recursive)) { count++; }
    if (findSeatInDirection(input, x, y, 1, 1, recursive)) { count++; }
    return count;
}

function calculateRound(input, tolerance, recursive) {
    const next = [];
    for (let y = 0; y < input.length; y++) {
        let newLine = '';
        for (let x = 0; x < input[y].length; x++) {
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

function countOccupiedSeats(input) {
    let count = 0;
    for (const line of input) {
        for (const char of line) {
            if (char === '#') {
                count++;
            }
        }
    }
    return count;
}

let nextP1 = JSON.parse(JSON.stringify(input));

for (let i = 0; i < 500; i++) {
    nextP1 = calculateRound(nextP1, 4, false);
}

const part1 = countOccupiedSeats(nextP1);
console.log('Part 1: ' + chalk.green(part1));

let nextP2 = JSON.parse(JSON.stringify(input));

for (let i = 0; i < 500; i++) {
    nextP2 = calculateRound(nextP2, 5, true);
}

const part2 = countOccupiedSeats(nextP2);
console.log('Part 2: ' + chalk.green(part2));