import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import Turndown from 'turndown';

const token = process.env.AUTH;
const turndownService = new Turndown();

function padDay(day) {
    return ('0' + day).slice(-2);
}

function parseDay() {
    if (process.argv.length === 3) {
        const day = parseInt(process.argv[2]);
        if (!isNaN(day) && day >= 1 && day <= 25) {
            return day;
        }
    }
    return null;
}

async function mkdir(day) {
    const path = 'day' + padDay(day);
    try {
        await fs.access(path);
    } catch(ignored) {
        await fs.mkdir(path);
    }
    return path;
}

async function fetchPage(day) {
    const url = 'https://adventofcode.com/2020/day/' + day;
    const response = await fetch(url, {
        headers: {
            'cookie': 'session=' + token
        }
    });
    const body = await response.text();
    return body;
}

async function main() {
    const day = parseDay();
    if (day === null) {
        console.log('usage: node init [day number]');
    } else {
        const path = await mkdir(day);
        const page = await fetchPage(day);
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