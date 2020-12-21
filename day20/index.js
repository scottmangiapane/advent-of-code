const chalk = require('chalk');
const fs = require('fs');

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
const tileSize = tiles[0].length;

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
        if (leftTile[i][tileSize - 1] !== rightTile[i][0]) {
            return false;
        }
    }
    return true;
}

function isAdjY(topTile, bottomTile) {
    for (let i = 0; i < tileSize; i++) {
        if (topTile[tileSize - 1][i] !== bottomTile[0][i]) {
            return false;
        }
    }
    return true;
}

function insertTile(picture, tile) {
    if (picture.length === 0) {
        picture.push([title]);
        return true;
    }
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

const picture = [];
for (const tile of tiles) {
    insertTile(tile);
}

console.log('Part 1: ' + chalk.green());
console.log('Part 2: ' + chalk.green());