const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day18/input.txt')
    .toString().trim().split('\n');

function reduce(line, solve) {
    let reduced = line;
    while (reduced.includes('(')) {
        const start = reduced.indexOf('(');
        if (start >= 0) {
            let end;
            let depth = 1;
            for (end = start + 1; depth !== 0; end++) {
                switch (reduced[end]) {
                    case '(':
                        depth++;
                        break;
                    case ')':
                        depth--;
                        break;
                }
            }
            const left = reduced.substring(0, start);
            const middle = reduced.substring(start, end);
            const right = reduced.substring(end);
            reduced = left + solve(middle.substring(1, middle.length - 1)) + right;
        }
    }
    return reduced;
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
                switch (stack.pop()) {
                    case '+':
                        stack.push(stack.pop() + parseInt(token));
                        break;
                    case '*':
                        stack.push(stack.pop() * parseInt(token));
                        break;
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
                switch (stack.pop()) {
                    case '+':
                        stack.push(stack.pop() + parseInt(token));
                        break;
                    case '*':
                        stack.push('*');
                        stack.push(parseInt(token));
                        break;
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

// 718118721435