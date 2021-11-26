import chalk from 'chalk';
import crypto from 'crypto'
import * as fs from 'fs';

const [input1, input2] = fs
    .readFileSync('2020/day22/input.txt')
    .toString().trim().split('\n\n')
    .map(deck => {
        const lines = deck.split('\n');
        return lines.slice(1).map(num => parseInt(num));
    });

function duplicateDeck(deck) {
    return JSON.parse(JSON.stringify(deck));
}

function calculateScore(deck1, deck2) {
    const deck = (deck1.length > deck2.length) ? deck1 : deck2;
    let count = 0;
    for (const [i, value] of deck.entries()) {
        count += (deck.length - i) * value;
    }
    return count;
}

function playCombat() {
    const deck1 = duplicateDeck(input1);
    const deck2 = duplicateDeck(input2);
    while (deck1.length > 0 && deck2.length > 0) {
        const card1 = deck1.shift();
        const card2 = deck2.shift();
        if (card1 > card2) {
            deck1.push(card1, card2);
        } else {
            deck2.push(card2, card1);
        }
    }
    return calculateScore(deck1, deck2);
}

console.log('Part 1: ' + chalk.green(playCombat()));

let part2;

function playRecursiveCombat(template1, template2) {
    const deck1 = duplicateDeck(template1);
    const deck2 = duplicateDeck(template2);
    const previousRounds = [];
    while (deck1.length > 0 && deck2.length > 0) {
        const currentRound = crypto
            .createHash('sha1')
            .update(JSON.stringify({ deck1, deck2 }))
            .digest('base64');
        if (previousRounds.includes(currentRound)) {
            return true;
        }
        previousRounds.push(currentRound);
        const card1 = deck1.shift();
        const card2 = deck2.shift();
        const roundWinnerIsP1 = (deck1.length >= card1 && deck2.length >= card2)
            ? playRecursiveCombat(
                deck1.slice(0, card1),
                deck2.slice(0, card2)
            ) : card1 > card2;
        if (roundWinnerIsP1) {
            deck1.push(card1, card2);
        } else {
            deck2.push(card2, card1);
        }
    }
    part2 = calculateScore(deck1, deck2);
    return deck1.length > deck2.length;
}

playRecursiveCombat(input1, input2);

console.log('Part 2: ' + chalk.green(part2));