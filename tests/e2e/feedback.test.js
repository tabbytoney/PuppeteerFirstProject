const puppeteer = require('puppeteer')
const expect = require('chai').expect 

describe('Feedback Test', () => {
    let browser
    let page

    before(async function () {
        browser = await puppeteer.launch({
            headless: true,
            devtools: false
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function () {
        await browser.close()
    })

    beforeEach(async function () {
        //before each it block
    })

    afterEach(async function () {
        //runs after each block
    })
    

    it('Display Feedback Form', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        //Click fweedback button
        await page.click('#feedback')
        //Input data into feedback form
        await page.waitForSelector('form')
        await page.type('#name', 'Tabby')
        await page.type('#email', 'tabs@gmail.com')
        await page.type('#subject', 'I like this')
        await page.type('#comment', 'Good job')
        //click submit button
        await page.click('input[type="submit"]')
        //Check for correct results
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')

    })

    it('Submit Feedback Form', async function() {

    })

    it('Display Results Page', async function() {

    })
    
    
    
})