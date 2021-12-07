import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day07/input.txt'))
    .toString().trim().split(',').map(num => parseInt(num));

function solve(calculateFuel) {
    const min = input.reduce((p, c) => (p < c) ? p : c);
    const max = input.reduce((p, c) => (p > c) ? p : c);
    let fuel = calculateFuel(max);
    for (let i = min; i < max; i++) {
        fuel = Math.min(fuel, calculateFuel(i));
    }
    return fuel;
}

function calculateLinearFuel(position) {
    let sum = 0;
    for (const value of input) {
        sum += Math.abs(value - position);
    }
    return sum;
}

function calculateExponentialFuel(position) {
    let sum = 0;
    for (const value of input) {
        const n = Math.abs(value - position);
        sum += n * n - n * (n - 1) / 2;
    }
    return sum;
}

const p1 = solve(calculateLinearFuel);
console.log('Part 1: ' + chalk.green(p1));

const p2 = solve(calculateExponentialFuel);
console.log('Part 2: ' + chalk.green(p2));