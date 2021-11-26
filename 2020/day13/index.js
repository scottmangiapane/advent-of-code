import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('2020/day13/input.txt')
    .toString().trim().split('\n');

const time = parseInt(input[0]);
const buses = input[1]
    .split(',')
    .map(bus => (bus === 'x') ? null : parseInt(bus));

function findTime(bus) {
    let total = 0;
    while (total < time) {
        total += bus;
    }
    return total - time;
}

let minBus, minBusTime;
for (const bus of buses) {
    if (bus !== null) {
        const busTime = findTime(bus);
        console.log('bus ' + bus + ': ' + busTime + ' minutes');
        if (minBus === undefined || busTime < minBusTime) {
            minBus = bus;
            minBusTime = busTime;
        }
    }
}

console.log('Part 1: ' + chalk.green(minBus * minBusTime));

for (const [i, bus] of buses.entries()) {
    if (bus !== null) {
        let val = bus - i;
        while (val < 0) {
            val += bus;
        }
        console.log('x = ' + val + ' % ' + bus);
    }
}

console.log('Part 2: ' + chalk.green('Use the Chinese Remainder Theorem'));
