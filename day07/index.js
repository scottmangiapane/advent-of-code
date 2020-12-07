const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day07/input.txt')
    .toString().trim().split('\n');

let rules = [];
let reverseRules = [];

for (const line of input) {
    const [, parent, remainder] = /^(.+) bags contain (.+)\.$/.exec(line);
    rules[parent] = [];
    if (remainder !== 'no other bags') {
        const children = remainder.split(', ');
        for (const child of children) {
            const [, number, color] = /^([0-9]+) (.+) bags?$/.exec(child);
            rules[parent].push({ number, color });
            reverseRules[color] = reverseRules[color] || [];
            reverseRules[color].push(parent);
        }
    }
}

function countParents(parentsFound, color) {
    if (!parentsFound.includes(color)) {
        parentsFound.push(color);
        if (reverseRules[color]) {
            for (const parent of reverseRules[color]) {
                countParents(parentsFound, parent);
            }
        }
    }
    return parentsFound.length;
}

const part1 = countParents([], 'shiny gold') - 1;

function countChildren(color) {
    let count = 1;
    for (const child of rules[color]) {
        count += child.number * countChildren(child.color);
    }
    return count;
}

const part2 = countChildren('shiny gold') - 1;

console.log('Part 1: ' + chalk.green(part1));
console.log('Part 2: ' + chalk.green(part2));