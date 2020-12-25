const puppeteer = require('puppeteer')
const expect = require('chai').expect 

describe('Payment Test', () => {
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

        //log in before test, visit login url directly
        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username') //the actual signon is 'username' and password' they aren't variables
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]') //didnt have an id so we used the input type
        await page.waitForSelector('#settingsBox') //selector for class = error alert-error
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
    

    it('Display payment form', async function() {
        //click pay bills tab
        await page.waitForSelector('.nav-tabs')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('.board')
    })

    it('Make payment', async function() {
        //add input to forms
        await page.select('#sp_payee', 'Apple') //Apple is the value we select
        await page.select('#sp_account', 'Credit Card')
        await page.type('#sp_amount', '500') //have to pass 500 as a string because we are inputting it into a text box
        //Select date - date picker - you click and a calendar pops up. We will type and submit by pressing enter
        await page.type('#sp_date', '2020-03-18')
        await page.keyboard.press('Enter')
        await page.type('#sp_description', 'Payment for rent.')
        await page.click('#pay_saved_payees')
        await page.waitForSelector('#alert_content')
    })
 
    
    
})