import chalk from 'chalk';
import { find } from 'domutils';
import { promises as fs } from 'fs';

const input = (await fs.readFile('2021/day08/input.txt'))
    .toString().trim().split('\n')
    .map(line => {
        return {
            left: line.split(' | ')[0].split(' '),
            right: line.split(' | ')[1].split(' ')
        }
    });

function solveP1() {
    let count = 0;
    for (const line of input) {
        for (const word of line.right) {
            if (findEasyWord(word) !== null) {
                count++;
            }
        }
    }
    return count;
}

function solveP2() {
    const signalMap = {};
    for (const line of input) {
        for (const word of line.left) {
            const easyWord = findEasyWord(word);
            if (easyWord !== null) {
                const { num, word } = easyWord;
                processSignal(signalMap, word, num);
            }
        }
        // for (const word of line.right) {
        //     const easyWord = findEasyWord(word);
        //     if (easyWord !== null) {
        //         const { num, word } = easyWord;
        //         processSignal(signalMap, word, num);
        //     }
        // }
    }
    console.log(signalMap);
}

function findEasyWord(word) {
    switch (word.length) {
        case 2:
            return { num: 1, word };
        case 4:
            return { num: 4, word };
        case 3:
            return { num: 7, word };
        case 7:
            return { num: 8, word };
    }
    return null;
}

function processSignal(signalMap, word, num) {
    switch (num) {
        case 1:
            processChar(signalMap, word, 'c');
            processChar(signalMap, word, 'f');
            break;
        case 4:
            processChar(signalMap, word, 'b');
            processChar(signalMap, word, 'c');
            processChar(signalMap, word, 'd');
            processChar(signalMap, word, 'f');
            break;
        case 7:
            processChar(signalMap, word, 'a');
            processChar(signalMap, word, 'c');
            processChar(signalMap, word, 'f');
            break;
        case 8:
            processChar(signalMap, word, 'a');
            processChar(signalMap, word, 'b');
            processChar(signalMap, word, 'c');
            processChar(signalMap, word, 'd');
            processChar(signalMap, word, 'e');
            processChar(signalMap, word, 'f');
            processChar(signalMap, word, 'g');
            break;
    }
}

function processChar(signalMap, word, char) {
    const candidates = word.split('');
    if (signalMap[char]) {
        signalMap[char] = signalMap[char]
            .filter(s => candidates.includes(s));
    } else {
        signalMap[char] = candidates;
    }
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));