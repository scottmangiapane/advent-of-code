import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day06/input.txt'))
    .toString().trim().split(',').map(val => parseInt(val));

function solve(iterations) {
    const timers = initializeTimers();
    for (let i = 0; i < iterations; i++) {
        let newFish = timers[0];
        for (let j = 0; j < timers.length - 1; j++) {
            timers[j] = timers[j + 1];
        }
        timers[8] = newFish;
        timers[6] += newFish;
    }
    return timers.reduce((previous, current) => previous + current);
}

function initializeTimers() {
    const timers = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const value of input) {
        timers[value]++;
    }
    return timers;
}

const p1 = solve(80);
console.log('Part 1: ' + chalk.green(p1));

const p2 = solve(256);
console.log('Part 2: ' + chalk.green(p2));