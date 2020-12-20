const puppeteer = require('puppeteer')

describe('Textbox and submit', () => {
    it('Type into textbox and submit form', async function() {
        const browser = await puppeteer.launch({
            headless: true,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('https://devexpress.github.io/testcafe/example/') //telling page to to visit this url
        await page.type('#developer-name', 'Tab') // first argu is selector of text box, second argu is what's typed, delay slows the typing so you can watch it but not needed
        await page.click('#tried-test-cafe', { clickCount: 1 }) //selector of the checkbox, clicks it once
        await page.select('#preferred-interface', 'JavaScript API') //selector of the dropdown, one of the dropdown <option>
        const message = 'Filling in box with text'
        await page.type('#comments', message)
        await page.click('#submit-button')
        await page.waitForSelector('.result-content')



        await page.waitFor(5000)
       
        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})