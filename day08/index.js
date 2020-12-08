const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day08/input.txt')
    .toString().trim().split('\n');

function flipCommand(lineToFlip) {
    input[lineToFlip] = input[lineToFlip]
        .replace('jmp', 'tmp')
        .replace('nop', 'jmp')
        .replace('tmp', 'nop');
}

function runBootCode() {
    let accumulator = 0;
    let linesTested = [];
    for (let i = 0; i < input.length; i++) {
        if (linesTested[i]) {
            return { accumulator, error: true };
        } else {
            linesTested[i] = true;
            const [, command, num] = /^(acc|jmp|nop) \+?(-?[0-9]+)$/.exec(input[i]);
            if (command === 'acc') {
                accumulator += parseInt(num);
            }
            if (command === 'jmp') {
                i += parseInt(num) - 1;
            }
        }
    }
    return { accumulator, error: false };
}

function fixBootLoop() {
    for (let i = 0; i < input.length; i++) {
        flipCommand(i);
        const { accumulator, error } = runBootCode();
        if (!error) {
            return accumulator;
        }
        flipCommand(i);
    }
}

const part1 = runBootCode().accumulator;
console.log('Part 1: ' + chalk.green(part1));

const part2 = fixBootLoop();
console.log('Part 2: ' + chalk.green(part2));