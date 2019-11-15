const puppeteer = require('puppeteer');
const fs = require('fs');
const mime = require('mime');
const URL = require('url').URL;

(async() => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
        dumpio: true,
    });
    const page = await browser.newPage();

    const responses = [];
    page.on('response', resp => {
        responses.push(resp);
    });

    page.on('load', () => {
        responses.map(async (resp, i) => {
            const request = await resp.request();
            const url = new URL(request.url);

            const split = url.pathname.split('/');
            let filename = split[split.length - 1];
            if (!filename.includes('.')) {
                filename += '.html';
            }

            const buffer = await resp.buffer();
            fs.writeFileSync(filename, buffer);
        });
    });

    await page.goto('http://www.recordmp3.co/#/watch?v=0hG_I8USKIc', {waitUntil: 'networkidle'});
    browser.close();
})();