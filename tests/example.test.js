const puppeteer = require('puppeteer')

describe('My First Puppeteer Test', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({ headless: false, sloMo: 500 }) //headless false means it'll open a physical browser
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http://example.com') //telling page to to visit this url
        await page.waitForSelector('h1') //R click, inspect an element. There's an <h1> so we tell it to find this on the page. If yes, it moves on - if none found it throws error
        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
} )