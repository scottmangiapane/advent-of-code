/*
 * This script downloads the questions for any given day and converts them to markdown. It also
 * downloads the input file. Because this is unique for each user, an auth token is required:
 *
 *     export AUTH=<your_session_cookie>
 *     node download <year> <day>
 */

import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import Turndown from 'turndown';

const token = process.env.AUTH;
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

function padDay(day) {
    return ('0' + day).slice(-2);
}

async function mkdir(year, day) {
    const path = year + '/day' + padDay(day);
    try {
        await fs.access(path);
    } catch(ignored) {
        await fs.mkdir(path);
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

async function main() {
    const year = parseYear();
    const day = parseDay();
    if (!token) {
        console.log('You must store your session cookie in the "AUTH" env variable before use.');
    } else if (!year || !day) {
        console.log('usage: node download [year] [day]');
    } else {
        const path = await mkdir(year, day);
        const input = await fetchPage(year, day, 'input');
        await fs.writeFile(`${ path }/input.txt`, input);
        const page = await fetchPage(year, day, '');
        const $ = cheerio.load(page);
        $('article.day-desc').each(async (index, element) => {
            const html = $.html(element);
            const markdown = turndownService.turndown(html);
            await fs.writeFile(`${ path }/part${ index + 1 }.md`, markdown);
        });
    }
}

main();