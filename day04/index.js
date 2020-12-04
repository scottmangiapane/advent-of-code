const chalk = require('chalk');
const fs = require('fs');

const input = fs
    .readFileSync('day04/input.txt')
    .toString().trim().split('\n\n');

let count1 = 0, count2 = 0;
for (const line of input) {
    const keys = line.replace(/\n/g, ' ').split(' ');
    if (line.includes('byr:') && line.includes('iyr:') && line.includes('eyr:') && line.includes('hgt:') && line.includes('hcl:') && line.includes('ecl:') && line.includes('pid:')) {
        count1++;
        let map = {};
        for (let i = 0; i < keys.length; i++) {
            const keyval = keys[i].split(':');
            map[keyval[0]] = keyval[1];
        }
        if (map.byr >= 1920 && map.byr <= 2002 && map.iyr >= 2010 && map.iyr <= 2020 && map.eyr >= 2020 && map.eyr <= 2030) {
            console.log('1: ' + map.hgt);
            if (/^(.+)(cm|in)$/.test(map.hgt)) {
                const [, hgt] = /^(.+)(cm|in)$/.exec(map.hgt);
                console.log(hgt);
                if ((map.hgt.includes('in') && hgt >= 59 && hgt <= 76) || (map.hgt.includes('cm') && hgt >= 150 && hgt <= 193)) {
                    if (/^#[0-9a-f]{6}$/.test(map.hcl)) {
                        if (/^amb|blu|brn|gry|grn|hzl|oth$/.test(map.ecl)) {
                            if (/^[0-9]{9}$/.test(map.pid)) {
                                count2++;
                            }
                        }
                    }
                }
            }
        }
    }
}

console.log('Part 1: ' + chalk.green(count1));
console.log('Part 2: ' + chalk.green(count2));