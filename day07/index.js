const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day07/input.txt')
    .toString().trim().split('\n');

let colors = [ 'shiny gold' ];

for (let i = 0; i < 100; i++) { // arbitrarily high number
    for (const line of input) {
        const [, parent, remainder] = /^(.+) bags contain (.+)\.$/.exec(line);
        if (remainder !== 'no other bags') {
            const children = remainder.split(', ');
            for (const child of children) {
                const [, number, color] = /^([0-9]+) (.+) bags?$/.exec(child);

                if (!colors.includes(parent) && colors.includes(color)) {
                    colors.push(parent);
                }
            }
        }
    }
}

const part1 = colors.length - 1;

function searchInput(color) {
    let count = 1;

    for (const line of input) {
        const [, parent, remainder] = /^(.+) bags contain (.+)\.$/.exec(line);
        if (parent === color) {
            console.log('looking for ' + color + ', child: ' + remainder);
            // console.log(count + ' so far');
            if (remainder === 'no other bags') {
                return 1;
            }
            const children = remainder.split(', ');
            for (const child of children) {
                console.log(child);
                const [, childNumber, childColor] = /^([0-9]+) (.+) bags?$/.exec(child);

                count += childNumber * searchInput(childColor);
            }
        }
    }

    return count;
}

const part2 = searchInput('shiny gold') - 1;

console.log('Part 1: ' + chalk.green(part1));
console.log('Part 2: ' + chalk.green(part2));