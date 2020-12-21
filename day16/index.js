const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day16/input.txt')
    .toString().trim().split('\n\n');

const rules = input[0]
    .split('\n')
    .map(line => {
        const regex = /^([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$/;
        const [, field, i1, i2, i3, i4] = regex.exec(line);
        return {
            field,
            ranges: [{
                min: parseInt(i1),
                max: parseInt(i2)
            },{
                min: parseInt(i3),
                max: parseInt(i4)
            }]
        }
    });

const myTicket = input[1]
    .split('\n')[1]
    .split(',')
    .map(value => parseInt(value));

const nearbyTickets = input[2]
    .split('\n')
    .slice(1)
    .map(line => line
        .split(',')
        .map(value => parseInt(value))
    );

function isValueValid(value, rules) {
    for (const rule of rules) {
        for (const range of rule.ranges) {
            if (value >= range.min && value <= range.max) {
                return true;
            }
        }
    }
    return false;
}

function sumOfInvalidFields(ticket) {
    let sum = 0;
    for (const value of ticket) {
        if (!isValueValid(value, rules)) {
            sum += value;
        }
    }
    return sum;
}

let part1 = 0;
for (const ticket of nearbyTickets) {
    part1 += sumOfInvalidFields(ticket);
}

console.log('Part 1: ' + chalk.green(part1));

Array.prototype.removeIf = function(callback) {
    var i = 0;
    while (i < this.length) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
        else {
            ++i;
        }
    }
};

function hasInvalidFields(ticket) {
    for (const value of ticket) {
        if (!isValueValid(value, rules)) {
            return true;
        }
    }
    return false;
}

function findFields(tickets) {
    const fields = rules.map(rule => rule.field);
    // build possibleFields object
    const possibleFields = [];
    for (let i = 0; i < myTicket.length; i++) {
        possibleFields.push(JSON.parse(JSON.stringify(fields)));
    }
    // weed out invalid fields
    for (const ticket of tickets) {
        for (const [i, value] of ticket.entries()) {
            possibleFields[i].removeIf(field => {
                const rule = rules.find(rule => rule.field === field);
                return !isValueValid(value, [ rule ]);
            });
            // since there is only one field, that field must not be used elsewhere
            if (possibleFields[i].length === 1) {
                for (let j = 0; j < possibleFields.length; j++) {
                    if (i !== j) {
                        possibleFields[j].removeIf(field => field === possibleFields[i][0]);
                    }
                }
            }
        }
    }
    return possibleFields;
}

const validTickets = [ myTicket ];
for (const ticket of nearbyTickets) {
    if (!hasInvalidFields(ticket)) {
        validTickets.push(ticket);
    }
}

const fields = findFields(validTickets);
for (const [i, field] of fields.entries()) {
    console.log(chalk.blue(i + ': ') + field);
}

console.log('Part 2: ' + chalk.green(myTicket));