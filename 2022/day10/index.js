import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day10/input.txt'))
    .toString().trim().split('\n')
    .map(line => {
        const [instruction, v] = line.split(' ');
        return { instruction, v: v ? parseInt(v) : null };
    });

function solve(run) {
    let x = 1, cycle = 1;
    for (const line of input) {
        const { instruction, v } = line;
        run(cycle, x);
        cycle++;
        if (instruction === 'addx') {
            run(cycle, x);
            cycle++;
            x += v;
        }
    }
}

const signals = [];
solve((cycle, x) => {
    if (!((cycle + 20) % 40)) signals.push(x * cycle);
});
const p1 = signals.reduce((a, c) => a + c);
console.log('Part 1: ' + chalk.green(p1));

const picture = [];
solve((cycle, x) => {
    const crt = cycle - 1;
    const row = Math.floor(crt / 40);
    picture[row] = picture[row] || '';
    picture[row] += (x >= crt % 40 - 1 && x <= crt % 40 + 1) ? '#' : '.';
});
const p2 = picture.join('\n');
console.log('Part 2: ' + chalk.dim('(below)') + '\n' + chalk.green(p2));