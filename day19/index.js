import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('day19/input.txt')
    .toString().trim().split('\n\n');

const rules = {};
for (const line of input[0].split('\n')) {
    if (line.includes('"')) {
        const [, num, val] = /^([0-9]+): "([a-zA-Z])+"$/.exec(line);
        rules[num] = val;
    } else if (line.includes('|')) {
        const [, num, left, right] = /^([0-9]+): ([0-9 ]+) \| ([0-9 ]+)$/.exec(line);
        rules[num] = [left.split(' '), right.split(' ')];
    } else {
        const [, num, remainder] = /^([0-9]+): ([0-9 ]+)$/.exec(line);
        rules[num] = [remainder.split(' ')];
    }
}

function ruleToExp(num) {
    const rule = rules[num];
    if (typeof rule === 'string') {
        return rule;
    }
    const exp = rule
        .map(list => list.map(item => ruleToExp(parseInt(item))).join(''))
        .join('|');
    return '(' + exp + ')';
}

function runTest() {
    const regex = RegExp('^' + ruleToExp(0) + '$');
    let answer = 0;
    for (const line of input[1].split('\n')) {
        if (regex.test(line)) {
            answer++;
        }
    }
    return answer;
}

console.log('Part 1: ' + chalk.green(runTest()));

console.log('Part 2: ' + chalk.green(runTest()));
// > 136
// < 278