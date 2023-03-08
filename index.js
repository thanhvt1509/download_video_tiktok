const puppeteer = require('puppeteer')

async function main() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto('https://www.tiktok.com/@taylorswift')
    const selector = '[data-e2e="user-post-item-list"]'
    await page.waitForSelector(selector)

    const videos = await page.$$eval(`${selector} > div`, (els) => {
        return els.map((el) => {
            const hrefs = el.querySelectorAll('a')
            const url = hrefs[0].href
            return { url }
        })
    })
    console.log(videos)
    await browser.close()
}

main()
