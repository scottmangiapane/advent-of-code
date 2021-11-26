import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('day23/input.txt')
    .toString().trim().split('')
    .map(val => parseInt(val));

let cups = JSON.parse(JSON.stringify(input));
let currentIndex = 0;

function pickUpCups(start, end) {
    start %= cups.length;
    end %= cups.length;
    if (start === 0) {
        currentIndex -= end;
    }
    if (start < end) {
        return cups.splice(start, end - start);
    }
    if (start > end) {
        const p1 = cups.splice(start, cups.length - start);
        const p2 = cups.splice(0, end);
        currentIndex -= end;
        return p1.concat(p2);
    }
    return [];
}

function increaseIndex(amount) {
    currentIndex = (currentIndex + amount) % cups.length;
}

function getAnswer() {
    let str = '';
    let i = (cups.findIndex(c => c === 1) + 1) % cups.length;
    for (; cups[i] !== 1; i = (i + 1) % cups.length) {
        str += cups[i];
    }
    return str;
}

for (let i = 0; i < 100; i++) {
    const sub = pickUpCups(currentIndex + 1, currentIndex + 4);
    let destinationVal = cups[currentIndex] - 1;
    while (!cups.includes(destinationVal)) {
        destinationVal--;
        if (destinationVal < 0) {
            destinationVal = cups.reduce((a, b) => Math.max(a, b));
        }
    }
    const destinationIndex = cups.findIndex(c => c === destinationVal);
    cups.splice(destinationIndex + 1, 0, ...sub);
    if (destinationIndex + 1 <= currentIndex) {
        increaseIndex(sub.length);
    }
    increaseIndex(1);
}

console.log('Part 1: ' + chalk.green(getAnswer()));

cups = JSON.parse(JSON.stringify(input));
currentIndex = 0;

for (let i = cups.reduce((a, b) => Math.max(a, b)) + 1; i <= 1000000; i++) {
    cups.push(i);
}

for (let i = 0; i < 10000000; i++) {
    const sub = pickUpCups(currentIndex + 1, currentIndex + 4);
    let destinationVal = cups[currentIndex] - 1;
    while (!cups.includes(destinationVal)) {
        destinationVal--;
        if (destinationVal < 0) {
            destinationVal = cups.reduce((a, b) => Math.max(a, b));
        }
    }
    const destinationIndex = cups.findIndex(c => c === destinationVal);
    cups.splice(destinationIndex + 1, 0, ...sub);
    if (destinationIndex + 1 <= currentIndex) {
        increaseIndex(sub.length);
    }
    increaseIndex(1);
}

const cupIndex = cups.findIndex(c => c === 1);
const part2 = cups[(cupIndex + 1) % cups.length] * cups[(cupIndex + 2) % cups.length];
console.log('Part 2: ' + chalk.green(part2));

// 249982500304