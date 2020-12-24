const puppeteer = require('puppeteer')
const expect = require('chai').expect


//to get the functions from helpers.js:
const { click } = require('../lib/helpers')
const { getText } = require('..//lib/helpers')
const { getCount } = require('..//lib/helpers')

describe('Tests using helper functions from different file', () => {
    //best practices to define variables outside the it block
    let browser
    let page   
    //before tells it to run these steps before anything runs, it test setup
    before(async function() {
        browser = await puppeteer.launch({
            headless: true,
            devtools: false  
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
    })

    after(async function() {
        await browser.close()
    })

    beforeEach(async function() { 
        //before each it block
    })

    afterEach(async function() {
        //runs after each block
    })

    it('tests with helper functions', async function() {
        await page.goto('http://example.com') 
        const title = await page.title() //the function returns the title and it's stored in the var
        //same to get URL
        const url = await page.url()
        //Dont need these bc they're specified in helpers.js
        //const text = await page.$eval('h1', element => element.textContent)
        //const count = await page.$$eval('p', element => element.length)
        const text = await getText(page, 'h1')
        const count = await getCount(page, 'p')

                //write assertion using Chai:
        expect(title).to.be.a('string', 'Example Domain')
        expect(url).to.include('example.com')
        expect(text).to.be.a('string', 'Example Domain')
        expect(count).to.equal(2)

        await page.goto('http:zero.webappsecurity.com/index.html')
        // these are specified in the functions in helpers.js
        //await page.waitForSelector('#signin_button')
        //await page.click('#signin_button')
        await click(page, '#signin_button') //page, selector arguments defined in helpers.js
        await page.waitForSelector('#signin_button', { hidden: true, timeout: 3000 })

    })
})