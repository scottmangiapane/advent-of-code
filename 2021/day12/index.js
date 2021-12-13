import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day12/input.txt'))
    .toString().trim().split('\n').map(line => {
        const [, left, right] = /^([a-zA-Z]+)-([a-zA-Z]+)$/.exec(line);
        return { left, right };
    });

const graph = {};
for (const line of input) {
    console.log(line.left + ' <-> ' + line.right);
    addLink(line.left, line.right);
}

function createNode(value) {
    return {
        value,
        adjacent: []
    }
}

function addLink(v1, v2) {
    if (!graph[v1]) {
        graph[v1] = createNode(v1);
    }
    if (!graph[v2]) {
        graph[v2] = createNode(v2);
    }
    if (!graph[v1].adjacent.includes(v2)) {
        graph[v1].adjacent.push(v2);
    }
    if (!graph[v2].adjacent.includes(v1)) {
        graph[v2].adjacent.push(v1);
    }
}

// function solveP1(value, visitedCounts) {
//     visitedCounts[value] = visitedCounts[value] || 0;
//     if (!isCapitalized(value) && visitedCounts[value] === 1) {
//         return 0;
//     }
//     let pathCount = (value === 'end') ? 1 : 0;
//     visitedCounts[value]++;
//     for (const adjacentValue of graph[value].adjacent) {
//         pathCount += solveP1(adjacentValue, visitedCounts);
//     }
//     visitedCounts[value]--;
//     return pathCount;
// }

function solveP1() {
    const q1 = ['start'];
    const q2 = [];
    let pathCount = 0;
    const visitedCounts = {};
    while (q1.length > 0) {
        const value = q1.shift();
        if (!isCapitalized(value) && visitedCounts[value] === 1) {
            continue;
        }
        q2.push(value);
        visitedCounts[value] = visitedCounts[value] || 0;
        visitedCounts[value]++;
        q1.push(graph[value].adjacent);
        // visitedCounts[value]--;
    }
    return pathCount;
}

let smallVisitOverride = false;

function solveP2(value, visitedCounts) {
    visitedCounts[value] = visitedCounts[value] || 0;
    let setSmallVisitOverride = false;
    if (!isCapitalized(value) && visitedCounts[value] === 1) {
        if (!['start', 'end'].includes(value) && !smallVisitOverride) {
            smallVisitOverride = true;
            setSmallVisitOverride = true;
        } else {
            return 0;
        }
    }
    let pathCount = (value === 'end') ? 1 : 0;
    visitedCounts[value]++;
    for (const adjacentValue of graph[value].adjacent) {
        pathCount += solveP2(adjacentValue, visitedCounts);
    }
    visitedCounts[value]--;
    if (setSmallVisitOverride) {
        smallVisitOverride = false;
    }
    return pathCount;
}

function isCapitalized(string) {
    return string.charAt(0) === string.charAt(0).toUpperCase();
}

const p1 = solveP1('start', {});
console.log('Part 1: ' + chalk.green(p1));

// const p2 = solveP2('start', {});
// console.log('Part 2: ' + chalk.green(p2));