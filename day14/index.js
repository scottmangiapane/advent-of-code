const chalk = require('chalk');
const fs = require('fs');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const input = fs
    .readFileSync('day14/input.txt')
    .toString().trim().split('\n');

// let globalMask;
// let memory = {};

// function applyMask(mask, value) {
//     let binary = decimalToBinary(value);
//     for (let i = 0; i <= binary.length; i++) {
//         if (mask[i] === '0') {
//             binary = binary.replaceAt(i, '0');
//         }
//         if (mask[i] === '1') {
//             binary = binary.replaceAt(i, '1');
//         }
//     }
//     return binaryToDecimal(binary);
// }

// function binaryToDecimal(bin) {
//     return parseInt(bin, 2);
// }

// function decimalToBinary(dec) {
//     let binary = (dec >>> 0).toString(2);
//     while (binary.length < 36) {
//         binary = '0' + binary;
//     }
//     return binary;
// }

// for (const line of input) {
//     if (line.startsWith('mask')) {
//         const [, mask] = /^mask = ([01X]+)$/.exec(line);
//         globalMask = mask;
//     } else {
//         const [, key, value] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
//         memory[key] = applyMask(globalMask, value);
//     }
// }

// console.log(memory);

// let total = 0;
// for (const key in memory) {
//     total += memory[key];
// }

// console.log('Part 1: ' + chalk.green(total));

let globalMask;
let memory = {};

function applyMask(mask, key) {
    let binary = decimalToBinary(key);
    for (let i = 0; i <= binary.length; i++) {
        if (mask[i] === '1') {
            binary = binary.replaceAt(i, '1');
        }
        if (mask[i] === 'X') {
            binary = binary.replaceAt(i, 'X');
        }
    }
    return binary;
}

function expandMask(mask) {
    let addresses = [ mask ];
    while (true) {
        const index = addresses.findIndex(a => a.includes('X'));
        if (index === -1) {
            break;
        }
        const i = addresses[index].indexOf('X');
        const a1 = addresses[index].replaceAt(i, '0');
        const a2 = addresses[index].replaceAt(i, '1');
        addresses.splice(index, 1, a1, a2);
    }
    return addresses;
}

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

for (const line of input) {
    if (line.startsWith('mask')) {
        const [, mask] = /^mask = ([01X]+)$/.exec(line);
        globalMask = mask;
    } else {
        const [, key, value] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
        const mask = applyMask(globalMask, key);
        for (const address of expandMask(mask)) {
            console.log('EXPANDED MASK: ' + address);
            memory[binaryToDecimal(address)] = parseInt(value);
        }
    }
}

console.log(memory);

let total = 0;
for (const key in memory) {
    total += memory[key];
}

console.log('Part 2: ' + chalk.green(total));