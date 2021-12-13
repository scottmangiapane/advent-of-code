import chalk from 'chalk';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day13/input.txt'))
    .toString().trim().split('\n\n');

const dots = input[0].split('\n').map(line => {
    const [, rawX, rawY] = /^([0-9]+),([0-9]+)$/.exec(line);
    return {
        x: parseInt(rawX),
        y: parseInt(rawY)
    }
});

const folds = input[1].split('\n').map(line => {
    const [, dimension, rawNum] = /^fold along ([xy])=([0-9]+)$/.exec(line);
    return {
        dimension,
        num: parseInt(rawNum)
    };
});

function solveP1() {
    foldDots(folds[0], dots);
    const map = {};
    for (const dot of dots) {
        const key = `${ dot.x }_${ dot.y }`;
        map[key] = true;
    }
    return Object.keys(map).length;
}

function solveP2() {
    for (const fold of folds) {
        foldDots(fold, dots);
    }
    const maxX = Math.max(...dots.map(dot => dot.x));
    const maxY = Math.max(...dots.map(dot => dot.y));
    const output = initializeOutput(maxX + 1, maxY + 1);
    for (const dot of dots) {
        output[dot.y][dot.x] = '#';
    }
    for (const line of output) {
        console.log(line.join(''));
    }
}

function foldDots(fold, dots) {
    for (const dot of dots) {
        if (fold.dimension === 'x' && dot.x > fold.num) {
            dot.x = fold.num - (dot.x - fold.num);
        }
        if (fold.dimension === 'y' && dot.y > fold.num) {
            dot.y = fold.num - (dot.y - fold.num);
        }
    }
}

function initializeOutput(width, height) {
    const output = new Array(height);
    for (let i = 0; i < output.length; i++) {
        output[i] = new Array(width);
        output[i].fill('.');
    }
    return output;
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green('Visually decode the text above'));