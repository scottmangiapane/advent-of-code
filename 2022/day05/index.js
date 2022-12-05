import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day05/input.txt'))
    .toString().split('\n\n');

const crates = [];
const temp = input[0].split('\n');
for (let i = 0; i < temp.length - 1; i++) {
    for (let j = 0; j < (temp[i].length - 1) / 4; j++) {
        crates[j] = crates[j] || [];
        const c = temp[temp.length - 2 - i][j * 4 + 1];
        if (c !== ' ') {
            crates[j][i] = c;
        }
    }
}

const instructions = input[1].trim().split('\n').map(line => {
    const [, amount, from, to] = /^move (\d+) from (\d+) to (\d+)$/.exec(line);
    return {
        amount: parseInt(amount),
        from: parseInt(from),
        to: parseInt(to)
    };
});

function duplicate(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function solveP1() {
    const c = duplicate(crates);
    for (const line of instructions) {
        const { amount, from, to } = line;
        const temp = c[from - 1].splice(c[from - 1].length - amount).reverse();
        c[to - 1].push(...temp);
    }
    return c.map(stack => stack.pop()).join('');
}

function solveP2() {
    const c = duplicate(crates);
    for (const line of instructions) {
        const { amount, from, to } = line;
        const temp = c[from - 1].splice(c[from - 1].length - amount);
        c[to - 1].push(...temp);
    }
    return c.map(stack => stack.pop()).join('');
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));