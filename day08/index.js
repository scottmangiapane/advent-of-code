const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day08/input.txt')
    .toString().trim().split('\n');

function flipCommand(lineToFlip) {
    console.log('1: ' + input[lineToFlip]);
    input[lineToFlip] = input[lineToFlip].replace('jmp', 'tmp');
    input[lineToFlip] = input[lineToFlip].replace('nop', 'jmp');
    input[lineToFlip] = input[lineToFlip].replace('tmp', 'nop');
    console.log('2: ' + input[lineToFlip]);
}

function test() {
    let linesTested = [];
    let accumulator = 0;
    let i;
    for (i = 0; i < input.length; i++) {
        if (linesTested[i]) {
            console.log('Infinite loop at line ' + accumulator);
            break;
        }
        linesTested[i] = true;
        const [, command, param] = /^(acc|jmp|nop) \+?(-?[0-9]+)$/.exec(input[i]);
        switch (command) {
            case 'acc':
                accumulator += parseInt(param);
                break;
            case 'jmp':
                i += parseInt(param) - 1;
                break;
        }
    }
    if (i >= input.length) {
        console.log('FINISHED NORMALLY');
        console.log('accumulator: ' + accumulator);
        process.exit(1);
    }
}

for (let i = 0; i < input.length; i++) {
    console.log("Swapped line " + i);
    flipCommand(i);
    test();
    flipCommand(i);
}

console.log('Part 1: ' + chalk.green());
console.log('Part 2: ' + chalk.green());