/*
 * This script downloads the questions for any given day and converts them to markdown. It also
 * downloads the input file and sets up the basic structure of my solution. Because question inputs
 * are unique for each user, you must first copy your session cookie into the `.env` file.
 *
 *     node init <year> <day>
 */

import chalk from 'chalk';
import * as cheerio from 'cheerio';
import dedent from 'dedent-js';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import Turndown from 'turndown';

dotenv.config();

const token = process.env.SESSION_COOKIE;
const turndownService = new Turndown();

function parseYear() {
    if (process.argv.length === 4) {
        const year = parseInt(process.argv[2]);
        if (!isNaN(year) && year >= 2020 && year <= 2021) {
            return year;
        }
    }
    return null;
}

function parseDay() {
    if (process.argv.length === 4) {
        const day = parseInt(process.argv[3]);
        if (!isNaN(day) && day >= 1 && day <= 25) {
            return day;
        }
    }
    return null;
}

function getPath(year, day) {
    const paddedDay = ('0' + day).slice(-2);
    return year + '/day' + paddedDay;
}

async function mkdir(path) {
    try {
        await fs.access(path);
    } catch(ignored) {
        await fs.mkdir(path, { recursive: true });
    }
    return path;
}

async function fetchPage(year, day, suffix) {
    const url = (suffix)
        ? 'https://adventofcode.com/' + year + '/day/' + day + '/' + suffix
        : 'https://adventofcode.com/' + year + '/day/' + day;
    const response = await fetch(url, { headers: { cookie: 'session=' + token } });
    return await response.text();
}

function printFile(name, contents) {
    console.log(name);
    const head = contents
        .split('\n')
        .slice(0, 10)
        .join('\n');
    const ellipses = (head.length !== contents.length) ? '\n...' : '';
    console.log(chalk.dim(head + ellipses));
}

async function initBoilerplate(path) {
    try {
        await fs.access(path + '/index.js');
    } catch(ignored) {
        const content = dedent `
            import chalk from 'chalk';
            import { promises as fs } from 'fs';

            const input = (await fs.readFile('${ path }/input.txt'))
                .toString().trim().split('\\n');

            function solveP1() {
                return null;
            }

            function solveP2() {
                return null;
            }

            const p1 = solveP1();
            const p2 = solveP2();

            console.log('Part 1: ' + chalk.green(p1));
            console.log('Part 2: ' + chalk.green(p2));
            `;
        await fs.writeFile(path + '/index.js', content);
    }
}

async function initInput(path, year, day) {
    const input = await fetchPage(year, day, 'input');
    printFile('input.txt', input);
    await fs.writeFile(path + '/input.txt', input);
}

async function initQuestions(path, year, day) {
    const page = await fetchPage(year, day, '');
    const $ = cheerio.load(page);
    $('article.day-desc').each(async (index, element) => {
        const html = $.html(element);
        const markdown = turndownService.turndown(html);
        await fs.writeFile(`${ path }/part${ index + 1 }.md`, markdown);
    });
}

async function main() {
    const year = parseYear();
    const day = parseDay();
    if (!token) {
        console.log('You must store your session cookie in the .env file before use.');
    } else if (!year || !day) {
        console.log('usage: node download [year] [day]');
    } else {
        const path = getPath(year, day);
        await mkdir(path);
        await initBoilerplate(path);
        await initInput(path, year, day);
        await initQuestions(path, year, day);
    }
}

main();