import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day06/input.txt')).toString().trim();

function solve(bufferSize) {
    let buffer = input.slice(0, bufferSize);
    for (let i = bufferSize; i < input.length; i++) {
        let areRepeats = false;
        for (let j = 0; j < buffer.length; j++) {
            const char = buffer[j];
            areRepeats = areRepeats
                || buffer.substring(0, j).includes(char)
                || buffer.substring(j + 1).includes(char);
        }
        if (!areRepeats) {
            return i;
        }
        buffer = buffer.substring(1);
        buffer += input[i];
    }
    return null;
}

const p1 = solve(4);
console.log('Part 1: ' + chalk.green(p1));

const p2 = solve(14);
console.log('Part 2: ' + chalk.green(p2));