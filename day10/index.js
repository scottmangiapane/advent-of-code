const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day10/input.txt')
    .toString().trim().split('\n')
    .map(i => parseInt(i));

input.push(0);
input.push(Math.max(...input) + 3);
input.sort((a, b) => a - b);

let j1 = 0;
let j3 = 0;
for (let i = 0; i < input.length - 1; i++) {
    switch (input[i + 1] - input[i]) {
        case 1:
            j1++;
            break;
        case 3:
            j3++;
            break;
    }
}

console.log('Part 1: ' + chalk.green(j1 * j3));

function createNode(value) {
    return { value, next: [] };
}

function findNext(array, root) {
    const i = array.findIndex(a => a === root.value);
    return array.filter(a => a > array[i] && a <= array[i] + 3);
}

function addChildren(array, root) {
    root.next = [];
    const children = findNext(array, root);
    for (const child of children) {
        const node = createNode(child);
        root.next.push(node);
    }
    for (const item of root.next) {
        addChildren(input, item);
    };
}

function countPaths(root) {
    if (root.next.length === 0) {
        return 1;
    }
    let count = 0;
    for (const item of root.next) {
        count += countPaths(item);
    }
    return count;
}

const root = createNode(input[0]);
addChildren(input, root);

console.log('Part 2: ' + chalk.green(countPaths(root)));