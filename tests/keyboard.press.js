const puppeteer = require('puppeteer')

describe('Keyboard press', () => {
    it('Simulating hitting enter to submit a search', async function() {
        const browser = await puppeteer.launch({
            headless: true,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http:zero.webappsecurity.com/index.html')
        await page.waitForSelector('#searchTerm')
        await page.type('#searchTerm', 'Hello World')
        await page.keyboard.press('Enter', { delay: 10 })

        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})