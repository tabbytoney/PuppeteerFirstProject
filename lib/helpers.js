//These functions can be used in any of the test files so we dont have to write them over and over again in each file

module.exports = {
    click: async function (page, selector) {

        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {         //this customizes your error messages
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            //this will return the text from a specific selector - has a callback function bc Puppeteer doesnt have a function specifically for extracting text
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error(`Cannot get text from selector: ${selector}`)
        }
    },
    getCount: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            //this will return the count(amount of specified element) from a specific selector - has a callback function bc Puppeteer doesnt have a function specifically for extracting text
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error(`Cannot get count of selector: ${selector}`)
        }
    },

    typeText: async function (page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error(`Could not type in to selector: ${selector}`)
        }
    },

    waitForText: async function (page, selector, text) { //wait until you can see the text
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                    {}, //without this empty object it wont work
                    selector,
                    text
            })
        } catch {
            throw new Error (`Text: ${text} not found for selector: ${selector}`)
        }
    },

    shouldNotExist: async function(page, selector) { //wait until element doesnt exist anymore
        try {
            //await page.waitFor(() => !document.querySelector(selector)) this line doesnt work because the signin button isn't visible but it's still in the DOM so it'll error
            await page.waitForSelector(selector, { hidden: true })
        } catch (error) {
            throw new Error(`Selector: ${selector} is visible but it shouldn't be.`)
        }
    }



}