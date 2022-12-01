import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day14/input.txt'))
    .toString().trim().split('\n\n');

let template = input[0].split('');

const rules = {};
input[1].split('\n').forEach(line => {
    const [, letters, element] = /^([A-Z][A-Z]) -> ([A-Z])$/.exec(line);
    rules[letters] = element;
});

function solve(steps) {
    console.log(template.join(''));
    const pairs = {};
    for (let i = 0; i < template.length - 1; i++) {
        const key = template[i] + template[i + 1];
        pairs[key] = pairs[key] || 0;
        pairs[key]++;
    }
    console.log(pairs);
    for (let step = 0; step < steps; step++) {
        for (const key in pairs) {
            const [first, last] = key.split('');
            const inserted = rules[key];
            initOrAdd(pairs, key, -1);
            initOrAdd(pairs, first + inserted, 1);
            initOrAdd(pairs, inserted + last, 1);
        }
    }
    console.log(pairs);
    const letters = {};
    for (const key in pairs) {
        const [first, last] = key.split('');
        // console.log('pair: ' + pairs[key]);
        initOrAdd(letters, first, pairs[key]);
        // console.log('letters[first]: ' + letters[first]);
        initOrAdd(letters, last, pairs[key]);
        // console.log('letters[last]: ' + letters[last]);
    }
    for (const key in letters) {
        if (key !== template[0] && key !== template[template.length - 1]) {
            // console.log(letters[key]);
            letters[key] = letters[key] / 2;
        }
    }
    console.log(...Object.values(letters));
    return Math.max(...Object.values(letters)) - Math.min(...Object.values(letters));
}

function initOrAdd(obj, key, value) {
    obj[key] = obj[key] || 0;
    obj[key] += value;
}

// function solve(steps) {
//     console.log(template.join(''));
//     for (let step = 0; step < steps; step++) {
//         for (let i = 0; i < template.length - 1; i++) {
//             const value = rules[template[i] + template[i + 1]];
//             template.splice(i + 1, 0, value);
//             i++;
//         }
//     }
//     console.log(template.join(''));
//     return findCount(template, Math.max) - findCount(template, Math.min);
// }

// function findCount(template, fn) {
//     const counts = {};
//     for (const char of template) {
//         counts[char] = counts[char] || 0;
//         counts[char]++;
//     }
//     return fn(...Object.values(counts));
// }

const p1 = solve(10);
console.log('Part 1: ' + chalk.green(p1));

// const p2 = solve(40);
// console.log('Part 2: ' + chalk.green(p2));