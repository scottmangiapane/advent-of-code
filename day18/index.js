import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('day18/input.txt')
    .toString().trim().split('\n');

function reduce(line, solve) {
    while (line.includes('(')) {
        const start = line.indexOf('(');
        let end;
        let depth = 1;
        for (end = start + 1; depth !== 0; end++) {
            if (line[end] === '(') {
                depth++;
            }
            if (line[end] === ')') {
                depth--;
            }
        }
        const left = line.substring(0, start);
        const middle = line.substring(start, end);
        const right = line.substring(end);
        line = left + solve(middle.substring(1, middle.length - 1)) + right;
    }
    return line;
}

function solveP1(line) {
    line = reduce(line, solveP1);
    const tokens = line.split(' ');
    const stack = [];
    for (const token of tokens) {
        if (/^[0-9]+$/.test(token)) {
            if (stack.length === 0) {
                stack.push(parseInt(token));
            } else {
                const last = stack.pop();
                if (last === '+') {
                    stack.push(stack.pop() + parseInt(token));
                }
                if (last === '*') {
                    stack.push(stack.pop() * parseInt(token));
                }
            }
        } else {
            stack.push(token);
        }
    }
    return stack.pop();
}

function solveP2(line) {
    line = reduce(line, solveP2);
    const tokens = line.split(' ');
    const stack = [];
    for (const token of tokens) {
        if (/^[0-9]+$/.test(token)) {
            if (stack.length === 0) {
                stack.push(parseInt(token));
            } else {
                if (stack[stack.length - 1] === '+') {
                    stack.pop();
                    stack.push(stack.pop() + parseInt(token));
                } else {
                    stack.push(parseInt(token));
                }
            }
        } else {
            stack.push(token);
        }
    }
    return eval(stack.join(''));
}

let part1 = 0;
for (const line of input) {
    part1 += solveP1(line);
}

console.log('Part 1: ' + chalk.green(part1));

let part2 = 0;
for (const line of input) {
    part2 += solveP2(line);
}

console.log('Part 2: ' + chalk.green(part2));