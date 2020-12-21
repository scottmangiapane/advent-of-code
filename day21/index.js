const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day21/input.txt')
    .toString().trim().split('\n')
    .map(line => {
        const [, s1, s2] = /^([a-z ]+) \(contains ([a-z, ]+)\)$/.exec(line);
        const ingredients = s1.split(' ');
        const allergens = s2.split(', ');
        return {
            allergens,
            ingredients
        };
    });

function applyBatch(map, allergen, ingredients) {
    map[allergen] = map[allergen]
        .filter(ingredient => ingredients.includes(ingredient));
}

function reduceMap(map) {
    for (const a1 in map) {
        if (map[a1].length === 1) {
            console.log(chalk.green('solved ' + a1));
            for (const a2 in map) {
                if (a1 !== a2) {
                    map[a2] = map[a2].filter(ingredient => ingredient !== map[a1][0]);
                }
            }
        }
    }
}

function mapHasIngredient(map, ingredient) {
    for (const allergen in map) {
        if (map[allergen].includes(ingredient)) {
            return true;
        }
    }
    return false;
}

function solveP1() {
    const map = {};
    for (const list of input) {
        for (const allergen of list.allergens) {
            // console.log(chalk.blue(allergen));
            if (!map[allergen]) {
                // console.log(chalk.dim('creating slot for ' + allergen));
                map[allergen] = JSON.parse(JSON.stringify(list.ingredients));
            } else {
                // console.log(chalk.dim('applying batch to ' + allergen));
                applyBatch(map, allergen, list.ingredients);
            }
        }
    }
    console.log(map);
    reduceMap(map);
    reduceMap(map);
    console.log(map);
    let count = 0;
    for (const list of input) {
        for (const ingredient of list.ingredients) {
            if (!mapHasIngredient(map, ingredient)) {
                count++;
            }
        }
    }
    return count;
}

console.log('Part 1: ' + chalk.green(solveP1()));
console.log('Part 2: ' + chalk.green('do by hand using above output'));