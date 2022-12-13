import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day13/input.txt'))
    .toString().trim().split('\n\n')
    .map(pair => pair.split('\n').map(packet => JSON.parse(packet)));

function compare(left, right) {
    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) { return -1; }
        if (left > right) { return 1; }
        return 0;
    }
    if (typeof left === 'object' && typeof right === 'object') {
        for (let i = 0; i < left.length && i < right.length; i++) {
            const result = compare(left[i], right[i]);
            if (result) { return result; }
        }
        if (left.length < right.length) { return -1; }
        if (left.length > right.length) { return 1; }
        return 0;
    }
    if (typeof left === 'number' && typeof right === 'object') {
        return compare([left], right);
    }
    if (typeof left === 'object' && typeof right === 'number') {
        return compare(left, [right]);
    }
    return 0;
}

function solveP1() {
    const indices = [];
    for (let i = 0; i < input.length; i++) {
        const [left, right] = input[i];
        if (compare(left, right) === -1) {
            indices.push(i + 1);
        }
    }
    return (indices.length) ? indices.reduce((a, c) => a + c) : 0;
}

function solveP2() {
    const flatInput = input.reduce((a, c) => a.concat(c));
    flatInput.push([[2]], [[6]]);
    flatInput.sort(compare);
    let d1, d2;
    for (let i = 0; i < flatInput.length; i++) {
        if (JSON.stringify(flatInput[i]) === '[[2]]') { d1 = i + 1; }
        if (JSON.stringify(flatInput[i]) === '[[6]]') { d2 = i + 1; }
    }
    return d1 * d2;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));