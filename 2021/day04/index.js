import chalk from 'chalk';
import { promises as fs } from 'fs';

// 44088
// 23670

const input = (await fs.readFile('2021/day04/input.txt'))
    .toString()
    .trim()
    .split('\n\n');

const nums = input[0]
    .split(',')
    .map(num => parseInt(num));

const boards = input
    .slice(1)
    .map(board => board
        .split('\n')
        .map(row => row
            .trim()
            .split(/ +/)
            .map(num => parseInt(num))));

const size = boards[0].length;

const calledNums = {};

function solveP1() {
    for (const num of nums) {
        for (const board of boards) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (board[i][j] === num) {
                        if (hasBingo(board, i, j)) {
                            return calculateScore(board, num);
                        }
                    }
                }
            }
        }
        calledNums[num] = true;
    }
    return '(╯°□°)╯︵ ┻━┻';
}

function hasBingo(board, i, j) {
    let hasBingoHorz = true;
    let hasBingoVert = true;
    for (let k = 0; k < size; k++) {
        if (!calledNums[board[i][k]]) {
            hasBingoHorz = false;
        }
        if (!calledNums[board[k][j]]) {
            hasBingoVert = false;
        }
    }
    return hasBingoHorz || hasBingoVert;
}

function calculateScore(board, num) {
    let sum = 0;
    for (const row of board) {
        for (const value of row) {
            if (value !== 'MATCH') {
                sum += value;
            }
        }
    }
    return sum * num;
}

function solveP2() {
    const winNums = {};
    let winner;
    for (const num of nums) {
        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (board[i][j] === num) {
                        board[i][j] = true;
                        if (hasBingo(board)) {
                            if (!winNums[b]) {
                                winner = { board, num };
                                console.log(b);
                                console.log(winner);
                                winNums[b] = true;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(winner);
    return calculateScore(
        [
            [ 3, true, true, true, true ],
            [ true, 78, true, true, true ],
            [ true, true, 23, true, true ],
            [ true, 79, true, true, true ],
            [ true, true, true, 80, true ]
          ],
        winner.num
    );
}

const p1 = solveP1();
console.log('Part 1: ' + chalk.green(p1));

// const p2 = solveP2();
// console.log('Part 2: ' + chalk.green(p2));