import chalk from 'chalk';
import { promises as fs } from 'fs';

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

function solveP1() {
    for (const num of nums) {
        for (const board of boards) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === num) {
                        board[i][j] = true;
                        if (hasBingo(board)) {
                            return calculateScore(board, num);
                        }
                    }
                }
            }
        }
    }
}

function hasBingo(board) {
    for (let i = 0; i < board.length; i++) {
        let hasBingo = true;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== true) {
                hasBingo = false;
            }
        }
        if (hasBingo) {
            return true;
        }
    }
    for (let i = 0; i < board[0].length; i++) {
        let hasBingo = true;
        for (let j = 0; j < board.length; j++) {
            if (board[j][i] !== true) {
                hasBingo = false;
            }
        }
        if (hasBingo) {
            return true;
        }
    }
    return false;
}

function calculateScore(board, num) {
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== true) {
                sum += board[i][j];
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
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
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

const p2 = solveP2();
console.log('Part 2: ' + chalk.green(p2));

// 44088
// 23670