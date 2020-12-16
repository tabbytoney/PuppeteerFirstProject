const puppeteer = require('puppeteer')

describe('Second Test File', () => {
    it('Navigating via browser', async function() {
        const browser = await puppeteer.launch({
            headless: false,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http://example.com') //telling page to to visit this url
        await page.waitForSelector('h1') //for some reason, the waitFor and waitForSelector doesn't work with goBack and goForward
        await page.goto('https://dev.to/') //second website to go to
        await page.waitForSelector('#body-styles') //this checks for an id on the second page. Id needs #
        await page.goBack() //navigate back arrow in the browser
        await page.waitForSelector('h1')
        await page.goForward() //navigate forward arrow in the browser
        await page.waitForSelector('#body-styles') 
        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})