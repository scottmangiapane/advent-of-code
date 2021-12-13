import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day10/input.txt'))
    .toString().trim().split('\n').map(line => line.split(''));

function solveP1() {
    let points = 0;
    for (const line of input) {
        const stack = [];
        for (const char of line) {
            if ('([{<'.includes(char)) {
                stack.push(char);
            } else {
                const popped = stack.pop();
                switch (char) {
                    case ')':
                        points += assertEquals(popped, '(', 3);
                        break;
                    case ']':
                        points += assertEquals(popped, '[', 57);
                        break;
                    case '}':
                        points += assertEquals(popped, '{', 1197);
                        break;
                    case '>':
                        points += assertEquals(popped, '<', 25137);
                        break;
                }
            }
        }
    }
    return points;
}

function assertEquals(char1, char2, points) {
    if (char1 !== char2) {
        return points;
    }
    return 0;
}

function solveP2() {
    let points = 0;
    for (const line of input) {
        const stack = [];
        for (const char of line) {
            if ('([{<'.includes(char)) {
                stack.push(char);
            } else {
                const popped = stack.pop();
                if (char === '(' && popped !== ')'
                    || char === '[' && popped !== ']'
                    || char === '{' && popped !== '}'
                    || char === '<' && popped !== '>') {
                        break;
                }
            }
        }
        if (stack.length !== 0) {
            const completion = stack.reverse().map(char => findInverseChar(char));
            console.log(completion);
        }
    }
    return points;
}

function findInverseChar(char) {
    switch (char) {
        case '(':
            return ')';
        case '[':
            return ']';
        case '{':
            return '}';
        case '<':
            return '>';
    }
}

// const p1 = solveP1();
// console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));