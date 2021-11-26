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

async function fetchPage(year, day) {
    const url = 'https://adventofcode.com/' + year + '/day/' + day;
    const response = await fetch(url, {
        headers: {
            'cookie': 'session=' + token
        }
    });
    const body = await response.text();
    return body;
}

async function main() {
    const year = parseYear();
    const day = parseDay();
    if (year === null || day === null) {
        console.log('usage: node init [year] [day]');
    } else {
        const path = await mkdir(year, day);
        const page = await fetchPage(year, day);
        const $ = cheerio.load(page);
        $('article.day-desc').each(async (index, element) => {
            const fileName = `${ path }/part${ index + 1 }.md`;
            const html = $.html(element);
            const markdown = turndownService.turndown(html);
            await fs.writeFile(fileName, markdown);
        });
    }
}

main();