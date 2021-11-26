import chalk from 'chalk';
import * as fs from 'fs';

const input = fs
    .readFileSync('2020/day12/input.txt')
    .toString().trim().split('\n');

function calcDistance(point) {
    console.log('x: ' + point.x);
    console.log('y: ' + point.y);
    return Math.abs(point.x) + Math.abs(point.y);
}

function rotatePoint(point, degrees) {
    const angle = degrees * Math.PI / 180;
    const tmp = point.x;
    point.x = Math.round(
        point.x * Math.cos(angle) - point.y * Math.sin(angle)
    );
    point.y = Math.round(
        point.y * Math.cos(angle) + tmp * Math.sin(angle)
    );
}

function translatePoint(point, cmd, value) {
    switch (cmd) {
        case 'N':
            point.y -= value;
            break;
        case 'S':
            point.y += value;
            break;
        case 'E':
            point.x += value;
            break;
        case 'W':
            point.x -= value;
            break;
    }
}

const ship1 = { x: 0, y: 0 };
let dir = 0;

for (const line of input) {
    let [, cmd, param] = /^([A-Z])([0-9]+)$/.exec(line);
    let value = parseInt(param);
    switch (cmd) {
        case 'N':
        case 'S':
        case 'E':
        case 'W':
            translatePoint(ship1, cmd, value);
            break;
        case 'L':
            value = -value;
        case 'R':
            dir = (dir + value + 360) % 360;
            break;
        case 'F':
            switch (dir) {
                case 0:
                    ship1.x += value;
                    break;
                case 90:
                    ship1.y += value;
                    break;
                case 180:
                    ship1.x -= value;
                    break;
                case 270:
                    ship1.y -= value;
                    break;
            }
            break;
    }
}

const part1 = calcDistance(ship1);
console.log('Part 1: ' + chalk.green(part1));

const ship2 = { x: 0, y: 0 };
const waypoint = { x: 10, y: -1 };

for (const line of input) {
    let [, cmd, param] = /^([A-Z])([0-9]+)$/.exec(line);
    let value = parseInt(param);
    switch (cmd) {
        case 'N':
        case 'S':
        case 'E':
        case 'W':
            translatePoint(waypoint, cmd, value);
            break;
        case 'L':
            value = -value;
        case 'R':
            rotatePoint(waypoint, value);
            break;
        case 'F':
            ship2.x += waypoint.x * value;
            ship2.y += waypoint.y * value;
            break;
    }
}

const part2 = calcDistance(ship2);
console.log('Part 2: ' + chalk.green(part2));