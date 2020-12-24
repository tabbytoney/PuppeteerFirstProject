//These functions can be used in any of the test files so we dont have to write them over and over again in each file

module.exports = {
    click: async function(page, selector) {

        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {         //this customizes your error messages
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            //this will return the text from a specific selector - has a callback function bc Puppeteer doesnt have a function specifically for extracting text
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error(`Cannot get text from selector: ${selector}`)
        }
    },
    getCount: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            //this will return the count(amount of specified element) from a specific selector - has a callback function bc Puppeteer doesnt have a function specifically for extracting text
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error(`Cannot get count of selector: ${selector}`)
        }
    },
}