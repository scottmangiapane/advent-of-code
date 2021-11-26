import chalk from 'chalk';
import * as fs from 'fs';

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index)
        + replacement
        + this.substr(index + replacement.length);
}

const input = fs
    .readFileSync('2020/day14/input.txt')
    .toString().trim().split('\n');

function binaryToDecimal(bin) {
    return parseInt(bin, 2);
}

function decimalToBinary(dec) {
    let binary = (dec >>> 0).toString(2);
    while (binary.length < 36) {
        binary = '0' + binary;
    }
    return binary;
}

function findSumOfMemory(memory) {
    let total = 0;
    for (const key in memory) {
        total += memory[key];
    }
    return total;
}

function applyMaskP1(mask, value) {
    let binary = decimalToBinary(value);
    for (let i = 0; i <= binary.length; i++) {
        if (mask[i] === '0') {
            binary = binary.replaceAt(i, '0');
        }
        if (mask[i] === '1') {
            binary = binary.replaceAt(i, '1');
        }
    }
    return binaryToDecimal(binary);
}

function applyMaskP2(mask, key) {
    let binary = decimalToBinary(key);
    for (let i = 0; i <= binary.length; i++) {
        if (mask[i] === '1') {
            binary = binary.replaceAt(i, '1');
        }
        if (mask[i] === 'X') {
            binary = binary.replaceAt(i, 'X');
        }
    }
    const addresses = [ binary ];
    const decodedKeys = [];
    while (addresses.length > 0) {
        const address = addresses.shift();
        const index = address.indexOf('X');
        if (index >= 0) {
            addresses.push(
                address.replaceAt(index, '0'),
                address.replaceAt(index, '1')
            );
        } else {
            decodedKeys.push(address);
        }
    }
    return decodedKeys.map(address => binaryToDecimal(address));
}

let globalMask;
const memoryP1 = {};
const memoryP2 = {};

for (const line of input) {
    if (line.startsWith('mask')) {
        const [, mask] = /^mask = ([01X]+)$/.exec(line);
        globalMask = mask;
    } else {
        const captured = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
        const key = captured[1];
        const value = parseInt(captured[2]);
        memoryP1[key] = applyMaskP1(globalMask, value);
        for (const decodedKey of applyMaskP2(globalMask, key)) {
            memoryP2[decodedKey] = value;
        }
    }
}

console.log('Part 1: ' + chalk.green(findSumOfMemory(memoryP1)));
console.log('Part 2: ' + chalk.green(findSumOfMemory(memoryP2)));