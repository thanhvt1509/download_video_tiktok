const puppeteer = require('puppeteer')
const axios = require('axios')

async function main() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    try {
        await page.goto('https://www.tiktok.com/@taylorswift', { waitUntil: 'networkidle2', timeout: 60000 })

        const videos = await page.$$eval('[data-e2e="user-post-item-list"] > div', (els) => {
            return els.map((el) => {
                const hrefs = el.querySelectorAll('a')
                const url = hrefs[0].href
                return { url }
            })
        })

        for (let i = 0; i < videos.length; i++) {

            const options = {
                method: 'GET',
                url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/index',
                params: { url: videos[i].url },
                headers: {
                    'X-RapidAPI-Key': '0d7421432fmsh3c8b027a54b05a6p1a076bjsndba7ac301901',
                    'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
                }
            }

            const response = await axios.request(options)
            console.log(response.data.video)
        }


    } catch (error) {
        console.error(error)
    } finally {
        await browser.close()
    }
}

main()
