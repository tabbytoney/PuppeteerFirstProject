const puppeteer = require('puppeteer')
const { pathToFileURL } = require('url')

describe('Get element text', () => {
    it('Get text of an element', async function() {
        const browser = await puppeteer.launch({
            headless: true,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http://example.com') //telling page to to visit this url

        //Puppeteer doesn't have a function to extract text so we create a var and a callback function
        const text = await page.$eval('h1', element => element.textContent)
        console.log('Text in the H1: ' + text)

        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})