const puppeteer = require('puppeteer')

describe('Login Test', () => {
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

    it('Login test - Invalid Credentials', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button') //always wait for selector of the thing you're going to click. Makes tests more stable
        await page.click('#signin_button')
        //verify the page that loads has the login form
        await page.waitForSelector('#login_form')
        //Add username
        await page.type('#user_login', 'invalid creds')
        //Add password
        await page.type('#user_password', 'invalid password')
        //click checkbox for 'keep me signed in'
        await page.click('#user_remember_me')
        //click signin button
        await page.click('input[type="submit"]') //didnt have an id so we used the input type
        //check for error that should show for invalid credentials
        await page.waitForSelector('.alert-error') //selector for class = error alert-error

    })

    it('Login test - Valid Credentials', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button') //always wait for selector of the thing you're going to click. Makes tests more stable
        await page.click('#signin_button')
        //verify the page that loads has the login form
        await page.waitForSelector('#login_form')
        //Add username
        await page.type('#user_login', 'username') //the actual signon is 'username' and password' they aren't variables
        //Add password
        await page.type('#user_password', 'password')
        //click checkbox for 'keep me signed in'
        await page.click('#user_remember_me')
        //click signin button
        await page.click('input[type="submit"]') //didnt have an id so we used the input type
        //check the confirmation for successful login banner
        await page.waitForSelector('#settingsBox') //selector for class = error alert-error
    })


})
