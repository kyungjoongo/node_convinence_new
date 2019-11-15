const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    page.setViewport({width: 1000, height: 600, deviceScaleFactor: 2});

    await page.goto('http://www.drapt.com/e_sale/index.htm?page_name=brief_msg_viewN&menu_key=19&uid=1065&view_count=15&start=0&field=&mode=&s_que=', {waitUntil: 'networkidle2'});

    async function screenshotDOMElement(selector, padding = 0) {
        const rect = await page.evaluate(selector => {
            const element = document.querySelector(selector);
            const {x, y, width, height} = element.getBoundingClientRect();
            return {left: x, top: y, width, height, id: element.id};
        }, selector);

        var uid=1065;

        return await page.screenshot({
            path: '../../public/images/image'+ uid + '.png',
            clip: {
                x: rect.left - padding,
                y: rect.top - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2
            }
        });
    }

    await screenshotDOMElement('.con', 0).then(()=>{
        console.log('##########success');
    });

    await browser.close();
})();