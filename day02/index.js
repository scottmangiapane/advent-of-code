const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day02/input.txt')
    .toString().trim().split('\n');

function testPart1(line) {
    const [, min, max, char, word] = /(.+)-(.+) (.): (.*)/g.exec(line);
    const count = word.split(char).length - 1;
    return count >= min && count <= max;
}

function testPart2(line) {
    const [, pos1, pos2, char, word] = /(.+)-(.+) (.): (.*)/g.exec(line);
    const isMatch1 = word.charAt(pos1 - 1) === char;
    const isMatch2 = word.charAt(pos2 - 1) === char;
    return (isMatch1 || isMatch2) && !(isMatch1 && isMatch2);
}

let countPart1 = 0, countPart2 = 0;

for (const line of input) {
    if (testPart1(line)) {
        countPart1++;
    }
    if (testPart2(line)) {
        countPart2++;
    }
}

console.log('Part 1: ' + chalk.green(countPart1));
console.log('Part 2: ' + chalk.green(countPart2));