import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day03/input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split('').map(char => parseInt(char)));

const size = input[0].length;

function solveP1() {
    let gamma = '';
    for (let i = 0; i < size; i++) {
        gamma += findMostCommonBit(i, null);
    }
    const epsilon = inverse(gamma);
    console.log('gamma: ' + gamma);
    console.log('epsilon: ' + epsilon);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function solveP2() {
    let gamma = '';
    for (let i = 0; i < size; i++) {
        gamma += findMostCommonBit(i, null);
    }
    const epsilon = inverse(gamma);
    console.log('gamma: ' + gamma);
    console.log('epsilon: ' + epsilon);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function findMostCommonBit(index, tiebreaker) {
    let zeroCount = 0;
    let oneCount = 0;
    for (const line of input) {
        if (line[index]) {
            oneCount++;
        } else {
            zeroCount++;
        }
    }
    if (zeroCount > oneCount) {
        return 0;
    }
    if (oneCount > zeroCount) {
        return 1;
    }
    return tiebreaker;
}

function inverse(binaryString) {
    let answer = '';
    for (let i = 0; i < binaryString.length; i++) {
        answer += (binaryString[i] === '0') ? '1' : '0';
    }
    return answer;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));