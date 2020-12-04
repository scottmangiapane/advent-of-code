const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day04/input.txt')
    .toString().trim().split('\n\n');

function getMap(passport) {
    const attributes = passport.replace(/\n/g, ' ').split(' ');
    const map = {};
    attributes.forEach(attribute => {
        const [key, val] = attribute.split(':');
        map[key] = val;
    });
    return map;
}

function hasRequiredAttributes(map) {
    return 'byr' in map
        && 'iyr' in map
        && 'eyr' in map
        && 'hgt' in map
        && 'hcl' in map
        && 'ecl' in map
        && 'pid' in map;
}

function hasValidYears(map) {
    return map.byr >= 1920 && map.byr <= 2002
        && map.iyr >= 2010 && map.iyr <= 2020
        && map.eyr >= 2020 && map.eyr <= 2030;
}

function hasValidHeight(map) {
    try {
        const [, hgt] = /^(.+)(cm|in)$/.exec(map.hgt);
        return (map.hgt.includes('in') && hgt >= 59 && hgt <= 76)
            || (map.hgt.includes('cm') && hgt >= 150 && hgt <= 193);
    } catch (err) { /* ignored */ }
    return false;
}

function hasValidHairColor(map) {
    return /^#[0-9a-f]{6}$/.test(map.hcl);
}

function hasValidEyeColor(map) {
    return /^amb|blu|brn|gry|grn|hzl|oth$/.test(map.ecl);
}

function hasValidPassportId(map) {
    return /^[0-9]{9}$/.test(map.pid);
}

let count1 = 0, count2 = 0;
for (const passport of input) {
    const map = getMap(passport);
    if (hasRequiredAttributes(map)) {
        count1++;
        if (hasValidYears(map)
            && hasValidHeight(map)
            && hasValidHairColor(map)
            && hasValidEyeColor(map)
            && hasValidPassportId(map)) {
            count2++;
        }
    }
}

console.log('Part 1: ' + chalk.green(count1));
console.log('Part 2: ' + chalk.green(count2));