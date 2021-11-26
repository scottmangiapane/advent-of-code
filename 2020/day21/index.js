import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('2020/day21/input.txt')
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

function isMapSolved(map) {
    for (const allergen in map) {
        if (map[allergen].length != 1) {
            return false;
        }
    }
    return true;
}

function reduceMap(map) {
    while (!isMapSolved(map)) {
        for (const a1 in map) {
            if (map[a1].length === 1) {
                for (const a2 in map) {
                    if (a1 !== a2) {
                        map[a2] = map[a2]
                            .filter(ingredient => ingredient !== map[a1][0]);
                    }
                }
            }
        }
    }
}

function solve() {
    const map = {};
    for (const list of input) {
        for (const allergen of list.allergens) {
            if (!map[allergen]) {
                map[allergen] = JSON.parse(JSON.stringify(list.ingredients));
            } else {
                applyBatch(map, allergen, list.ingredients);
            }
        }
    }
    reduceMap(map);
    return map;
}

function mapHasIngredient(map, ingredient) {
    for (const allergen in map) {
        if (map[allergen].includes(ingredient)) {
            return true;
        }
    }
    return false;
}

const map = solve();
let part1 = 0;
for (const list of input) {
    for (const ingredient of list.ingredients) {
        if (!mapHasIngredient(map, ingredient)) {
            part1++;
        }
    }
}

console.log(map);

console.log('Part 1: ' + chalk.green(part1));
console.log('Part 2: ' + chalk.green('Build string by hand'));