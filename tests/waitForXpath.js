const puppeteer = require('puppeteer')

describe('WaitforXpath', () => {
    it('Wait for Xpath for h1 element', async function() {
        const browser = await puppeteer.launch({
            headless: true,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http://example.com/')
        await page.waitForXPath('//body')


        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})