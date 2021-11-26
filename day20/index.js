import chalk from 'chalk';
import * as fs from 'fs';

const tiles = fs
    .readFileSync('day20/input.txt')
    .toString().trim().split('\n\n')
    .map(block => {
        const lines = block.split('\n');
        const [, title] = /^Tile ([0-9]+):$/.exec(lines.shift());
        return {
            title,
            lines
        };
    });

const pictureSize = Math.sqrt(tiles.length);
const tileSize = tiles[0].lines.length;

function flip(tile) {
    tile.lines.reverse();
}

function rotate(tile) {
    const original = JSON.parse(JSON.stringify(tile.lines));
    for (let i = 0; i < tileSize; i++) {
        tile.lines[i] = '';
        for (let j = 0; j < tileSize; j++) {
            tile.lines[i] += original[tileSize - j - 1][i];
        }
    }
}

function isAdjX(leftTile, rightTile) {
    for (let i = 0; i < tileSize; i++) {
        if (leftTile.lines[i][tileSize - 1] !== rightTile.lines[i][0]) {
            return false;
        }
    }
    return true;
}

function isAdjY(topTile, bottomTile) {
    for (let i = 0; i < tileSize; i++) {
        if (topTile.lines[tileSize - 1][i] !== bottomTile.lines[0][i]) {
            return false;
        }
    }
    return true;
}

function areAdj(t1, t2) {
    return isAdjX(t1, t2) || isAdjX(t2, t1)
        || isAdjY(t1, t2) || isAdjY(t2, t1);
}

function areNeighbors(t1, t2) {
    if (areAdj(t1, t2)) { return true; }
    rotate(t2);
    if (areAdj(t1, t2)) { return true; }
    rotate(t2);
    if (areAdj(t1, t2)) { return true; }
    rotate(t2);
    if (areAdj(t1, t2)) { return true; }
    flip(t2);
    if (areAdj(t1, t2)) { return true; }
    rotate(t2);
    if (areAdj(t1, t2)) { return true; }
    rotate(t2);
    if (areAdj(t1, t2)) { return true; }
    rotate(t2);
    if (areAdj(t1, t2)) { return true; }
    return false;
}

// const corners = [];
// for (const t1 of tiles) {
//     let neighbors = 0;
//     for (const t2 of tiles) {
//         if (t1.title !== t2.title) {
//             if (areNeighbors(t1, t2)) {
//                 neighbors++;
//             }
//         }
//     }
//     if (neighbors === 2) {
//         console.log(t1.title);
//         corners.push(t1.title);
//     }
// }

// const part1 = corners.reduce((acc, next) => acc * next, 1);
// console.log('Part 1: ' + chalk.green(part1));

function createPicture(size, initialTile) {
    const picture = [];
    for (let i = 0; i < size; i++) {
        picture.push(Array(size).fill(null));
    }
    picture[0][0] = initialTile;
    return picture;
}

function insertTile(picture, tile) {
    for (let i = 0; i < picture.length; i++) {
        for (let j = 0; j < picture[i].length; j++) {
            if (isAdjX(picture[i][j], tile)) {
                picture[i].push(tile);
                return true;
            }
            if (isAdjY(picture[i][j], tile)) {
                picture[i].push(tile);
                return true;
            }
        }
    }
    return false;
}

const picture = createPicture(pictureSize, tiles[0]);
for (let i = 1; i < tiles.length; i++) {
    insertTile(picture, tiles[i]);
}

console.log('Part 2: ' + chalk.green());