const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Get page title and url', () => {
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

    it('Get page title and url', async function() {
        //how browser would be factored for use only within this it block
        // const browser = await puppeteer.launch({
        //     headless: true,  //headless false means it'll open a physical browser
        //     sloMo: 1000,  //slows test down by this many miliseconds
        //     devtools: false
        // })  
        //const page = await browser.newPage() //connects the page that results from browser starting to puppeteer
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

        //await browser.close() Is now in our after block so we dont have to write it in each it block
    })
})