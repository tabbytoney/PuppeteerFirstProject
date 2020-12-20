const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Get page title and url', () => {
    it('Get page title and url', async function() {
        const browser = await puppeteer.launch({
            headless: true,  //headless false means it'll open a physical browser
            sloMo: 1000,  //slows test down by this many miliseconds
            devtools: false
        })  //opens browser with dev tools open
        const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
        await page.goto('http://example.com') //telling page to to visit this url
        //To get page title
        //to get value you must have somewhere to store it
        const title = await page.title() //the function returns the title and it's stored in the var
        //same to get URL
        const url = await page.url()
        const text = await page.$eval('h1', element => element.textContent)
        const count = await page.$$eval('p', element => element.length)

                //write assertion using Chai:
        expect(title).to.be.a('string', 'Example Domain')
        expect(url).to.include('example.com')
        expect(text).to.be.a('string', 'Example Domain')
        expect(count).to.equal(2)

        await browser.close() //must close browser at end of test or you'll have to do it manually
    })
})