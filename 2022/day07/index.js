import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2022/day07/input.txt'))
    .toString().trim().split('$ ').filter(group => group).map(group => {
        const [command, ...output] = group.trim().split('\n');
        return {
            command: command.split(' '),
            output: output.map(line => line.split(' '))
        }
    });

function createNode(name, size, parent, children) {
    return { name, size, parent, children };
}

function buildTree(root) {
    let node = root;
    for (const group of input) {
        const { command, output } = group;
        switch (command[0]) {
            case 'cd':
                switch (command[1]) {
                    case '/':
                        node = root;
                        break;
                    case '..':
                        node = node.parent;
                        break;
                    default:
                        node = node.children.find(n => n.name === command[1]);
                        break;
                }
                break;
            case 'ls':
                for (const line of output) {
                    if (line[0] === 'dir') {
                        const child = createNode(line[1], 0, node, []);
                        node.children.push(child);
                    } else {
                        const child = createNode(line[1], parseInt(line[0]), node, null);
                        node.children.push(child);
                    }
                }
                break;
        }
    }
}

function calculateDirSizes(node) {
    if (node.children) {
        for (const child of node.children) {
            node.size += calculateDirSizes(child);
        }
    }
    return node.size;
}

function print(node, depth) {
    const prefix = new Array(depth * 2 + 1).join(' ') + '-';
    if (node.children) {
        console.log(`${prefix} ${node.name} (dir, size=${node.size})`);
        if (!node.name) {
            console.log(node);
            console.log(node.parent);
            console.log(node.parent.children);
        }
        for (const child of node.children) {
            print(child, depth + 1);
        }
    } else {
        console.log(`${prefix} ${node.name} (file, size=${node.size})`);
    }
}

function solveP1(node) {
    let sum = 0;
    if (node.children) {
        for (const child of node.children) {
            sum += solveP1(child);
        }
        return (node.size <= 100000) ? sum + node.size : sum;
    }
    return 0;
}

function solveP2(node, additionalNeeded) {
    if (node.children) {
        let min = node.size;
        for (const child of node.children) {
            const childMin = solveP2(child, additionalNeeded);
            if (childMin >= additionalNeeded) {
                min = Math.min(min, childMin);
            }
        }
        return min;
    }
}

const tree = createNode('/', 0, null, []);
buildTree(tree);
calculateDirSizes(tree);
print(tree, 0);

console.log('Part 1: ' + chalk.green(solveP1(tree)));

const freeSpace = 70000000 - tree.size;
const additionalNeeded = 30000000 - freeSpace;
console.log('Part 2: ' + chalk.green(solveP2(tree, additionalNeeded)));