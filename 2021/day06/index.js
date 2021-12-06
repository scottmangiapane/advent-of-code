import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day06/input.txt'))
    .toString().trim().split(',').map(val => parseInt(val));

// function solveP1() {
//     for (let count = 0; count < 80; count++) {
//         const size = input.length;
//         for (let i = 0; i < size; i++) {
//             input[i]--;
//             if (input[i] === -1) {
//                 input.push(8);
//                 input[i] = 6;
//             }
//         }
//     }
//     return input.length;
// }

function solveP2() {
    const counts = [0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < input.length; i++) {
        const val = input[i];
        counts[val]++;
    }
    for (let count = 0; count < 256; count++) {
        let newFish = counts[0];
        for (let i = 0; i < counts.length - 1; i++) {
            counts[i] = counts[i + 1];
        }
        counts[8] = newFish;
        counts[6] += newFish;
    }
    let sum = 0;
    for (let i = 0; i < counts.length; i++) {
        sum += counts[i];
    }
    return sum;
}

// const p1 = solveP1();
// console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));