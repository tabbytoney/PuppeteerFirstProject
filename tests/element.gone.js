const puppeteer = require('puppeteer')

describe('Checking an element has disappeared', () => {
    it('Is the signin button gone?', async function() {
        const browser = await puppeteer.launch({
            headless: true,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http:zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        //Checking selector is gone, long way:
        //await page.waitFor(() => !document.querySelector('#signin_button')) //waits til that selector no longer is present
        //Checking selector is gone, short way:
        await page.waitForSelector('#signin_button', { hidden: true, timeout: 3000 })
        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})